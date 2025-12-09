import Sale from "../models/Sale.js";

/**
 * Parse comma-separated values into array (trimmed, non-empty)
 */
function parseCSVParam(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val;
  return String(val)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Map sort token (sort param) to Mongoose sort object.
 * Accept tokens: date_desc (default), date_asc, quantity_desc, quantity_asc, customer_asc, customer_desc
 */
function parseSort(sortParam) {
  const defaultSort = { Date: -1 }; // newest first
  if (!sortParam) return defaultSort;

  switch (sortParam) {
    case "date_desc": return { Date: -1 };
    case "date_asc": return { Date: 1 };
    case "quantity_desc": return { Quantity: -1 };
    case "quantity_asc": return { Quantity: 1 };
    case "customer_asc": return { CustomerName: 1 };
    case "customer_desc": return { CustomerName: -1 };
    default: return defaultSort;
  }
}

function projectDoc(doc) {
  return {
    date: doc.Date,
    customer: {
      name: doc.CustomerName,
      phone: doc.PhoneNumber
    },
    product: {
      name: doc.ProductName
    },
    order: {
      quantity: doc.Quantity,
      finalAmount: doc.FinalAmount,
      paymentMethod: doc.PaymentMethod,
      orderStatus: doc.OrderStatus
    },
    gender: doc.Gender,
    age: doc.Age,
    customerRegion: doc.CustomerRegion,
    productCategory: doc.ProductCategory,
    tags: doc.Tags,
    employeeName: doc.EmployeeName,
    storeLocation: doc.StoreLocation
  };
}


/**
 * Build query from request query parameters and run it with pagination & sort
 * Returns { data: [..], totalItems, totalPages, page, limit }
 */
export async function buildAndRunQuery(rawQuery) {
  // === Parse pagination ===
  const page = Math.max(1, Number(rawQuery.page) || 1);
  const limit = 10; // fixed by requirement
  const skip = (page - 1) * limit;

  // === Parse search ===
  const search = rawQuery.search ? String(rawQuery.search).trim() : null;

  // === Parse multi-select filters ===
  const regionArr = parseCSVParam(rawQuery.region);            // CustomerRegion
  const genderArr = parseCSVParam(rawQuery.gender);            // Gender
  const categoryArr = parseCSVParam(rawQuery.category);        // ProductCategory
  const paymentArr = parseCSVParam(rawQuery.payment);          // PaymentMethod

  // === Parse age range ===
  const ageMin = rawQuery.age_min ? Number(rawQuery.age_min) : null;
  const ageMax = rawQuery.age_max ? Number(rawQuery.age_max) : null;

  // === Parse date range (expect YYYY-MM-DD strings). If not provided, ignored.
  const dateFrom = rawQuery.date_from ? String(rawQuery.date_from) : null;
  const dateTo = rawQuery.date_to ? String(rawQuery.date_to) : null;

  // === Tags: must match ALL selected tags (AND semantics) ===
  // rawQuery.tags expected like "tag1,tag2"
  const tagArr = parseCSVParam(rawQuery.tags); // array of tags to match ALL

  // === Sorting ===
  const sortParam = rawQuery.sort || "date_desc";
  const sortObj = parseSort(sortParam);

  // === Build Mongo query object ===
  const mongoQuery = {};

  // Search: CustomerName OR PhoneNumber (case-insensitive, substring)
  if (search) {
    const escaped = escapeRegExp(search);
    const regex = new RegExp(escaped, "i");
    mongoQuery.$or = [
      { CustomerName: regex },
      { PhoneNumber: regex }
    ];
  }

  // Multi-select filters: $in usage
  if (regionArr && regionArr.length) mongoQuery.CustomerRegion = { $in: regionArr };
  if (genderArr && genderArr.length) mongoQuery.Gender = { $in: genderArr };
  if (categoryArr && categoryArr.length) mongoQuery.ProductCategory = { $in: categoryArr };
  if (paymentArr && paymentArr.length) mongoQuery.PaymentMethod = { $in: paymentArr };

  // Age range
  if (ageMin != null || ageMax != null) {
    mongoQuery.Age = {};
    if (ageMin != null && !Number.isNaN(ageMin)) mongoQuery.Age.$gte = ageMin;
    if (ageMax != null && !Number.isNaN(ageMax)) mongoQuery.Age.$lte = ageMax;
  }

  // Date range — assumes Date is stored as ISO-like 'YYYY-MM-DD' strings
  if (dateFrom || dateTo) {
    mongoQuery.Date = {};
    if (dateFrom) mongoQuery.Date.$gte = dateFrom;
    if (dateTo) mongoQuery.Date.$lte = dateTo;
  }

  // Tags ALL-match: Tags is stored as a CSV string; ensure each requested tag appears as substring (case-insensitive)
  if (tagArr && tagArr.length) {
    // Build $and of regex checks on Tags field
    mongoQuery.$and = mongoQuery.$and || [];
    for (const tag of tagArr) {
      const esc = escapeRegExp(tag);
      mongoQuery.$and.push({ Tags: { $regex: new RegExp(esc, "i") } });
    }
  }

  // === Query execution ===
  // Count total items matching filters (for meta)
  const totalItems = await Sale.countDocuments(mongoQuery);

  // Fetch paginated results
  const docs = await Sale.find(mongoQuery)
    .sort(sortObj)
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  // Project docs to frontend shape
  const data = docs.map(projectDoc);

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  return {
    data,
    totalItems,
    totalPages,
    page,
    limit
  };
}

/**
 * Escape regex special characters (for safe substring regex)
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

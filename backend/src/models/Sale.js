import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  TransactionID: { type: String, index: true },
  Date: { type: String, index: true }, // expecting ISO-like YYYY-MM-DD strings
  CustomerID: String,
  CustomerName: { type: String, index: true },
  PhoneNumber: { type: String, index: true },
  Gender: { type: String, index: true },
  Age: { type: Number, index: true },
  CustomerRegion: { type: String, index: true },
  CustomerType: String,
  ProductID: String,
  ProductName: String,
  Brand: String,
  ProductCategory: { type: String, index: true },
  Tags: { type: String }, // stored as CSV string (e.g. "tag1,tag2"); service uses substring checks
  Quantity: { type: Number, index: true },
  PricePerUnit: Number,
  DiscountPercentage: Number,
  TotalAmount: Number,
  FinalAmount: Number,
  PaymentMethod: { type: String, index: true },
  OrderStatus: String,
  DeliveryType: String,
  StoreID: String,
  StoreLocation: String,
  SalespersonID: String,
  EmployeeName: String
}, { collection: "sales" });

// Text index for search on name + phone
saleSchema.index({ CustomerName: "text", PhoneNumber: "text" });

// Additional compound indexes could be added later if needed for performance

export default mongoose.model("Sale", saleSchema);

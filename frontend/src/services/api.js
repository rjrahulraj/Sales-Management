const API_URL = "http://localhost:5000/api/sales";

/**
 * Convert filters and sort objects into query params string
 */
function buildQueryString({ filters = {}, sort = {}, page = 1, search = "" }) {
  const params = {};

  // filters
  for (const key in filters) {
    if (filters[key]) params[key] = filters[key];
  }

  // search
  if (search) params.search = search;

  // sort
  if (sort.field && sort.order) params.sort = `${sort.field}_${sort.order}`;

  // page
  params.page = page;

  return new URLSearchParams(params).toString();
}

export async function fetchSales({ filters, sort, page, search }) {
  const queryString = buildQueryString({ filters, sort, page, search });
  const res = await fetch(`${API_URL}?${queryString}`);
  return res.json();
}

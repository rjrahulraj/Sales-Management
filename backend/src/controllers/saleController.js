import { buildAndRunQuery } from "../services/saleService.js";

export async function getSales(req, res) {
  try {
    const queryParams = req.query; // raw query string params
    const result = await buildAndRunQuery(queryParams);

    return res.json({
      meta: {
        page: result.page,
        limit: result.limit,
        totalItems: result.totalItems,
        totalPages: result.totalPages
      },
      data: result.data
    });
  } catch (err) {
    console.error("getSales error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}

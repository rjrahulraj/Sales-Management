import express from "express";
import { importCSV } from "../utils/importCSV.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await importCSV();
    res.json({ success: true, message: "CSV imported (or already imported)." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

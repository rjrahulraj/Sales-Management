import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/config/db.js";
import saleRoutes from "./src/routes/saleRoutes.js";
import { importCSV } from "./src/utils/importCSV.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

import importCsvRoutes from "./src/routes/importCsvRoutes.js";

// API routes
app.use("/api/sales", saleRoutes);

// Serve React frontend in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend dist folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api/import-csv", importCsvRoutes);

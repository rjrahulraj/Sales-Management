import fs from "fs";
import path from "path";
import Sale from "../models/Sale.js";
import readline from "readline";

export const importCSV = async () => {
  try {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const filePath = path.join(__dirname, "..", "..", "data", "truestate_assignment_dataset.csv");

    if (!fs.existsSync(filePath)) {
      console.error("CSV file not found:", filePath);
      return;
    }

    // Avoid re-import
    const count = await Sale.countDocuments();
    if (count > 0) {
      console.log("CSV already imported.");
      return;
    }

    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: stream });

    let header = [];
    const batch = [];
    const batchSize = 1000; // safe for Render

    for await (const line of rl) {
      if (!header.length) {
        header = line.split(",");
        continue;
      }

      const cols = line.split(",");
      const obj = {};

      header.forEach((h, i) => {
        let val = cols[i]?.trim() ?? null;
        if (!isNaN(val) && val !== "") val = Number(val);
        if (val === "") val = null;
        obj[h] = val;
      });

      batch.push(obj);

      if (batch.length >= batchSize) {
        await Sale.insertMany(batch, { ordered: false });
        batch.length = 0;
      }
    }

    if (batch.length) {
      await Sale.insertMany(batch, { ordered: false });
    }

    console.log("CSV imported successfully (stream mode).");
  } catch (error) {
    console.error("CSV Import Error:", error);
  }
};

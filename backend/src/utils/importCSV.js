import fs from "fs";
import path from "path";
import Sale from "../models/Sale.js";

export const importCSV = async () => {
  try {
    const filePath = path.join(process.cwd(), "data", "truestate_assignment_dataset.csv");

    if (!fs.existsSync(filePath)) {
      console.error("CSV file not found:", filePath);
      return;
    }

    // Check if already imported
    const count = await Sale.countDocuments();
    if (count > 0) {
      console.log("CSV already imported.");
      return;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");

    // Split CSV into rows
    const rows = fileContent.split("\n").map(r => r.trim());
    const header = rows[0].split(",");

    const records = [];

    for (let i = 1; i < rows.length; i++) {
      const cols = rows[i].split(",");

      if (cols.length !== header.length) continue;

      const obj = {};
      for (let j = 0; j < header.length; j++) {
        let val = cols[j].trim();

        // Convert numeric columns
        if (!isNaN(val) && val !== "") val = Number(val);

        if (val === "") val = null;

        obj[header[j]] = val;
      }
      records.push(obj);
    }

    await Sale.insertMany(records, { ordered: false });
    console.log("CSV Imported Successfully.");
  } catch (error) {
    console.error("CSV Import Error:", error);
  }
};

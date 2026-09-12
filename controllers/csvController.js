import { productModel } from "../models/productModel.js";

export const importProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a CSV file" });
    }

    const fileContent = req.file.buffer.toString("utf-8");
    const lines = fileContent
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length <= 1) {
      return res.status(400).json({ message: "CSV file is empty or has no data rows" });
    }

    const validProducts = [];
    const invalidRecords = [];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(",").map((item) => item.trim());
      const [name, description, priceStr, category, stockStr, publishedStr] = parts;

      const price = Number(priceStr);
      const stock = Number(stockStr);
      const isPublishedValid = publishedStr === "true" || publishedStr === "false";

      if (
        !name ||
        !description ||
        !category ||
        isNaN(price) ||
        price <= 0 ||
        isNaN(stock) ||
        stock < 0 ||
        !isPublishedValid
      ) {
        invalidRecords.push({ row: i + 1, data: lines[i] });
        continue;
      }

      validProducts.push({
        name,
        description,
        price,
        category,
        stock,
        published: publishedStr === "true",
        ownerId: req.user._id,
      });
    }

    if (validProducts.length === 0) {
      return res.status(400).json({
        message: "No valid records found in CSV file",
        invalidRecords,
      });
    }

    await productModel.insertMany(validProducts);

    return res.status(201).json({
      message: "Products imported successfully",
      insertedCount: validProducts.length,
      rejectedCount: invalidRecords.length,
      invalidRecords,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to import CSV", error: error.message });
  }
};

export const exportProducts = async (req, res) => {
  try {
    const products = await productModel.find();

    let csv = "name,description,price,category,stock,published\n";

    for (const p of products) {
      csv += `${p.name},${p.description},${p.price},${p.category},${p.stock},${p.published}\n`;
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=products.csv");
    return res.status(200).send(csv);
  } catch (error) {
    return res.status(500).json({ message: "Failed to export CSV", error: error.message });
  }
};

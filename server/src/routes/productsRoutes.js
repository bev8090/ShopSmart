import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Retrieve all products
router.get("/", async (_, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(`Error in fetching products: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Retrieve products by category
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    res.status(200).json(products);
  } catch (error) {
    console.log(`Error in fetching products by category: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Find product by id
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error in retrieving product", error.message);
    res.status(500).json({ message: "Internal service error" });
  }
});

// Create a product
router.post("/", async (req, res) => {
  try {
    const { name, price, image, description, category, countInStock } = req.body;

    if (!name || !price || !image || !description || !category || !countInStock) {
      console.log("Invalid input fields");
      return res.status(400).json({ message: "Please provide all input fields" });
    }

    const product = new Product({ name, price, image, description, category, countInStock });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(`Error in creating product: ${error.message}`);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Update a product by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in updating product:", error.message);
    res.status(500).json({ message: "Internal service error" });
  }
});

// Delete a product by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error("Error in deleting product:", error.message);
    res.status(500).json({ message: "Internal service error" });
  }
});

export default router;
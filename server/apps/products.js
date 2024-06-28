import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const products = await collection.find({}).toArray();
    return res.json({ data: products });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = ObjectId(req.params.productId);
  try {
    const products = await collection.find({
      _id: productId,
    });
    return res.json(products);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const productData = { ...req.body };
  try {
    const products = await collection.insertOne(productData);
    return res.json({
      message: "Product has been created successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = ObjectId(req.params.productId);
  const newProductData = { ...req.body };
  try {
    await collection.updateOne(
      {
        _id: productId,
      },
      {
        $set: newProductData,
      }
    );
    return res.json({
      message: "Product has been updated successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  const productId = ObjectId(req.params.productId);
  try {
    await collection.deleteOne({
      _id: movieId,
    });
    return res.json({
      message: "Product has been deleted successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

export default productRouter;

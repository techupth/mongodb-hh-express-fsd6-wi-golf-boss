import { Router } from "express";
import { db } from "../utils/db.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const products = await collection.find({}).toArray();

  return res.json({ data: products });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");

  const productData = { ...req.body };
  const product = await collection.insertOne(productData);

  return res.json({
    message: "Product has been created successfully",
  });
});

productRouter.put("/:id", (req, res) => {});

productRouter.delete("/:id", (req, res) => {});

export default productRouter;

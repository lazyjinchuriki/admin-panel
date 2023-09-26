import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";
import { isAdimn } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  await isAdimn(req, res); //check if user is admin

  if (method === "POST") {
    const { name, description, price, category, images, properties } = req.body;
    try {
      const product = await Product.create({
        name,
        description,
        price,
        category,
        images,
        properties,
      });
      res.json(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the product." });
    }
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "PUT") {
    const { name, description, price, _id, category, images, properties } =
      req.body;
    await Product.updateOne(
      { _id },
      { name, description, price, category, images, properties }
    );
    res.json({ message: "Product updated successfully." });
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json({ message: "Product deleted successfully." });
    }
  }
}

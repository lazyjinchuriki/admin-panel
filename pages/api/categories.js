import { Category } from "@/models/categories";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdimn } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const method = req.method;
  await mongooseConnect();

  await isAdimn(req, res); //check if user is admin

  if (method === "GET") {
    res.json(await Category.find().populate("parent"));
  }

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      properties,
    });
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, parentCategory, _id, properties } = req.body;
    const categoryDoc = await Category.updateOne(
      { _id },
      { name, parent: parentCategory || undefined, properties }
    );
    res.json(categoryDoc);
  }
  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json({ message: "Category deleted successfully." });
  }
}

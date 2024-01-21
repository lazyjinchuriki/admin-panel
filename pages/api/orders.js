import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/order";
import { isAdimn } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  await mongooseConnect();
  await isAdimn(req, res);

  res.json(await Order.find().sort({ createdAt: -1 }));
}

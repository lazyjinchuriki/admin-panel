import { mongooseConnect } from "@/lib/mongoose";
import { Setting } from "@/models/Setting";
import { isAdimn } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
  await isAdimn(req, res);

  if (req.method === "PUT") {
    const { name, value } = req.body;
    const settingDoc = await Setting.findOne({ name });
    if (settingDoc) {
      settingDoc.value = value;
      await settingDoc.save();
      res.json(settingDoc);
    } else {
      res.json(await Setting.create({ name, value }));
    }
  }

  if (req.method === "GET") {
    const { name } = req.query;
    res.json(await Setting.findOne({ name }));
  }
}

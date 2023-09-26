import multiparty from "multiparty";
import fs from "fs";
import { mongooseConnect } from "@/lib/mongoose";
import { createSupabaseClient } from "@/utils/supabase";
import { isAdimn } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();

  await isAdimn(req, res); //check if user is admin

  const form = new multiparty.Form();
  const { files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ files });
    });
  });
  const supabase = createSupabaseClient();

  const links = [];

  for (const file of files.files) {
    const ext = file.originalFilename.split(".").pop();
    const newFilename = `products/${Date.now()}.${ext}`;
    const path = fs.readFileSync(file.path);

    const { data, error } = await supabase.storage
      .from("products")
      .upload(newFilename, path);

    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while uploading the image." });
    }

    const link = `${process.env.NEXT_PUBLIC_CDN_URL}${newFilename}`;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};

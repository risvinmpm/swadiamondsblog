import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import BannerModel from "@/lib/models/BannerModel";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function GET() {
  await ConnectDB();
  try {
    const banner = await BannerModel.findOne();
    return NextResponse.json({ success: true, banner });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await ConnectDB();
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const imageFile = formData.get("image") as File | null;

  let imageUrl = "";

  if (imageFile) {
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const filename = `banner-${Date.now()}-${imageFile.name}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);
    imageUrl = `/uploads/${filename}`;
  }

  const updateData: any = { title };
  if (imageUrl) updateData.image = imageUrl;

  const updated = await BannerModel.findOneAndUpdate({}, updateData, { new: true, upsert: true });
  return NextResponse.json({ success: true, banner: updated });
}

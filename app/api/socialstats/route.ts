import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import { ConnectDB } from "@/lib/config/db";
import SocialStatsModel from "@/lib/models/SocialStat";

const createUploadsDir = async () => {
  const dir = path.join(process.cwd(), "public", "uploads", "social");
  if (!fs.existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
  return dir;
};

export async function POST(req: NextRequest) {
  await ConnectDB();
  const formData = await req.formData();
  const labels = formData.getAll("labels") as string[];
  const counts = formData.getAll("counts") as string[];
  const links = formData.getAll("links") as string[];
  const icons = formData.getAll("icons") as File[];

  const uploadsDir = await createUploadsDir();

  const uploadedItems = await Promise.all(
    labels.map(async (label, i) => {
      let imageUrl = "";
      const icon = icons[i];
      if (icon && icon instanceof File && icon.size > 0) {
        const buffer = Buffer.from(await icon.arrayBuffer());
        const filename = `${Date.now()}-${icon.name}`;
        const filepath = path.join(uploadsDir, filename);
        await writeFile(filepath, buffer);
        imageUrl = `/uploads/social/${filename}`;
      }

      return {
        label,
        count: counts[i],
        icon: imageUrl,
        link: links[i],
      };
    })
  );

  const updated = await SocialStatsModel.findOneAndUpdate(
    {},
    { items: uploadedItems },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true, stats: updated });
}

export async function GET() {
  await ConnectDB();
  const stats = await SocialStatsModel.findOne();
  return NextResponse.json({ success: true, stats });
}
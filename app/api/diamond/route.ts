import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import slugify from "slugify";

import { ConnectDB } from "@/lib/config/db";
import DiamondModel from "@/lib/models/DiamondModel";

export const runtime = "nodejs";
const uploadDir = path.join(process.cwd(), "public", "uploads");

async function ensureUploadDir() {
  await mkdir(uploadDir, { recursive: true });
}

/* ─── GET ───────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  await ConnectDB();
  const id = req.nextUrl.searchParams.get("id");

  try {
    if (id) {
      const diamond = await DiamondModel.findById(id);
      if (!diamond)
        return NextResponse.json(
          { success: false, msg: "Diamond not found" },
          { status: 404 }
        );
      return NextResponse.json({ success: true, diamond });
    }

    const diamonds = await DiamondModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, diamonds });
  } catch (err) {
    console.error("GET /api/diamond error:", err);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch diamonds" },
      { status: 500 }
    );
  }
}

/* ─── POST ──────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  await ConnectDB();

  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const file = formData.get("image") as File | null;

    if (!title || !description || !file)
      return NextResponse.json(
        { success: false, msg: "Missing title, description, or image" },
        { status: 400 }
      );

    await ensureUploadDir();

    const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;
    const slug = slugify(title, { lower: true, strict: true });

    if (await DiamondModel.findOne({ slug }))
      return NextResponse.json(
        { success: false, msg: "A diamond article with this title exists" },
        { status: 409 }
      );

    const newDiamond = await DiamondModel.create({
      title,
      description,
      image: imageUrl,
      slug,
    });

    return NextResponse.json(
      { success: true, msg: "Diamond added 🎉", diamond: newDiamond },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/diamond error:", err);
    return NextResponse.json(
      { success: false, msg: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ─── DELETE ────────────────────────────────────────────────────── */
export async function DELETE(req: NextRequest) {
  await ConnectDB();
  const id = req.nextUrl.searchParams.get("id");

  if (!id)
    return NextResponse.json(
      { success: false, msg: "Missing id" },
      { status: 400 }
    );

  const diamond = await DiamondModel.findById(id);
  if (!diamond)
    return NextResponse.json(
      { success: false, msg: "Diamond not found" },
      { status: 404 }
    );

  // remove thumbnail
  try {
    fs.unlinkSync(path.join("public", diamond.image));
  } catch {
    /* ignore if file missing */
  }

  await DiamondModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Diamond deleted" });
}

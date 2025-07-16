import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import WhatsNewModel from "@/lib/models/WhatsNewModel";
import { ConnectDB } from "@/lib/config/db";

export const dynamic = "force-dynamic";

// GET all items
export async function GET() {
  try {
    await ConnectDB();
    const items = await WhatsNewModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, items });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Fetch error" }, { status: 500 });
  }
}

// POST new item
export async function POST(req: NextRequest) {
  try {
    await ConnectDB();

    const formData = await req.formData();
    const file = formData.get("image") as File;
    const text = formData.get("text") as string;

    if (!file || !text) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads/whatsnew");

    if (!fs.existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

    const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const imgUrl = `/uploads/whatsnew/${filename}`;

    const item = new WhatsNewModel({ image: imgUrl, text });
    await item.save();

    return NextResponse.json({ success: true, item });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Upload failed" }, { status: 500 });
  }
}

// DELETE item by ID
export async function DELETE(req: NextRequest) {
  try {
    await ConnectDB();

    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Missing ID" }, { status: 400 });
    }

    const deletedItem = await WhatsNewModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ success: false, message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Item deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
}

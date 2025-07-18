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
  } catch (error) {
    console.error("GET /api/banner error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch banner" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await ConnectDB();

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const imageFile = formData.get("image") as File | null;

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (imageFile) {
      if (!imageFile.type.startsWith("image/")) {
        return NextResponse.json(
          { success: false, message: "Invalid image file" },
          { status: 400 }
        );
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = imageFile.name.split(".").pop();
      const filename = `banner-${Date.now()}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const filepath = path.join(uploadDir, filename);

      // Create uploads folder if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Created uploads directory: ${uploadDir}`);
      }

      // Save the file
      await writeFile(filepath, buffer);
      console.log(`Saved file: ${filepath}`);

      // Confirm file saved
      if (!fs.existsSync(filepath)) {
        console.error("File does not exist after save!");
        return NextResponse.json(
          { success: false, message: "Failed to save image file" },
          { status: 500 }
        );
      }

      imageUrl = `/uploads/${filename}`;
    }

    const updateData: Partial<{ title: string; image: string }> = { title };
    if (imageUrl) updateData.image = imageUrl;

    const updatedBanner = await BannerModel.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: true,
    });

    return NextResponse.json({ success: true, banner: updatedBanner });
  } catch (error) {
    console.error("PUT /api/banner error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update banner" },
      { status: 500 }
    );
  }
}

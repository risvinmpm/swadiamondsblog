import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";
import slugify from "slugify";

import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

export const runtime = "nodejs";

const uploadDir = path.join(process.cwd(), "public", "uploads");

async function ensureUploadDir() {
  await mkdir(uploadDir, { recursive: true });
}

export async function GET(req: NextRequest) {
  await ConnectDB();
  const blogId = req.nextUrl.searchParams.get("id");

  try {
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json(
          { success: false, msg: "Blog not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, blog });
    } else {
      const blogs = await BlogModel.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, blogs });
    }
  } catch (err) {
    console.error("GET /api/blog error:", err);
    return NextResponse.json(
      { success: false, msg: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await ConnectDB();

  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString().trim();
    const description = formData.get("description")?.toString().trim();
    const file = formData.get("image") as File | null;

    if (!title || !description || !file) {
      return NextResponse.json(
        { success: false, msg: "Missing title, description, or image" },
        { status: 400 }
      );
    }

    await ensureUploadDir();

    const filename = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());

    await writeFile(filepath, buffer);

    const imageUrl = `/uploads/${filename}`;
    const slug = slugify(title, { lower: true, strict: true });

    const existing = await BlogModel.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, msg: "A blog with this title already exists" },
        { status: 409 }
      );
    }

    const newBlog = await BlogModel.create({
      title,
      description,
      image: imageUrl,
      slug,
    });

    return NextResponse.json(
      { success: true, msg: "Blog added successfully 🎉", blog: newBlog },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/blog error:", err);
    return NextResponse.json(
      { success: false, msg: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await ConnectDB();
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ msg: "Missing blog ID" }, { status: 400 });
  }

  const blog = await BlogModel.findById(id);
  if (!blog) {
    return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
  }

  if (blog.image) {
    const filePath = path.join(process.cwd(), "public", blog.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({ success: true, msg: "Blog deleted" });
}

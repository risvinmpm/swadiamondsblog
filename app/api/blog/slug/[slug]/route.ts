// app/api/blog/slug/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

export const runtime = "nodejs";

// ---- GET /api/blog/slug/[slug] --------------------------------------------
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }   
) {
  await ConnectDB();

  try {
    const { slug } = await params;              
    const blog = await BlogModel.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, msg: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    console.error("GET /api/blog/slug error:", err);
    return NextResponse.json(
      { success: false, msg: "Server error" },
      { status: 500 }
    );
  }
}

// app/api/uploads/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ✅ This is the correct signature for a dynamic route in Next.js App Router
export async function GET(
  req: NextRequest,
  context: { params: { filename: string } } // ✅ Must use this structure
) {
  const { filename } = context.params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();

    const contentTypeMap: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
    };

    const contentType = contentTypeMap[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "File not found" },
      { status: 404 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const result = await uploadImageToCloudinary(file);
    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ success: false, message: "Upload failed", error: error.message }, { status: 500 });
  }
}

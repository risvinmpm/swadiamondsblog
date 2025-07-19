import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
  }

  try {
    const uploaded = await uploadImageToCloudinary(file);
    return NextResponse.json({ success: true, url: (uploaded as any).secure_url });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Upload failed", error }, { status: 500 });
  }
}

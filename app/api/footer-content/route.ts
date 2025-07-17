import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import FooterContent from "@/lib/models/FooterContent";

export async function GET() {
  await ConnectDB();
  const content = await FooterContent.findOne();
  return NextResponse.json({ success: true, data: content });
}

export async function POST(req: NextRequest) {
  await ConnectDB();

  try {
    const body = await req.json();
    const { aboutText, newsletterText, instagramImages } = body;

    // Improved validation
    if (
      !aboutText?.trim() ||
      !newsletterText?.trim() ||
      !Array.isArray(instagramImages) ||
      instagramImages.length === 0
    ) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid fields" },
        { status: 400 }
      );
    }

    let existing = await FooterContent.findOne();

    if (existing) {
      existing.aboutText = aboutText;
      existing.newsletterText = newsletterText;
      existing.instagramImages = instagramImages;
      await existing.save();
    } else {
      await FooterContent.create({ aboutText, newsletterText, instagramImages });
    }

    return NextResponse.json({ success: true, message: "Saved successfully" });
  } catch (error) {
    console.error("❌ Error saving footer content:", error);
    return NextResponse.json(
      { success: false, message: "Server error while saving footer content" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import FooterContent from "@/lib/models/FooterContent";

export async function GET(req: NextRequest) {
  await ConnectDB();
  const content = await FooterContent.findOne();
  return NextResponse.json({ success: true, data: content });
}

export async function POST(req: NextRequest) {
  await ConnectDB();
  const body = await req.json();

  const {
    aboutText,
    newsletterText,
    newsletterHeading,
    instagramHeading,
    instagramImages,
    socialLinks,
  } = body;

  if (
    !aboutText ||
    !newsletterText ||
    !newsletterHeading ||
    !instagramHeading ||
    !Array.isArray(instagramImages)
  ) {
    return NextResponse.json(
      { success: false, message: "Missing fields" },
      { status: 400 }
    );
  }

  try {
    const existing = await FooterContent.findOne();
    if (existing) {
      existing.aboutText = aboutText;
      existing.newsletterText = newsletterText;
      existing.newsletterHeading = newsletterHeading;
      existing.instagramHeading = instagramHeading;
      existing.instagramImages = instagramImages;
      existing.socialLinks = socialLinks;
      await existing.save();
    } else {
      await FooterContent.create(body);
    }
    return NextResponse.json({ success: true, message: "Saved" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

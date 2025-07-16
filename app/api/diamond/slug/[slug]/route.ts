import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import DiamondModel from "@/lib/models/DiamondModel";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await ConnectDB();

  try {
    const { slug } = await params;
    const diamond = await DiamondModel.findOne({ slug }).lean();
    if (!diamond)
      return NextResponse.json(
        { success: false, msg: "Diamond not found" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, diamond });
  } catch (err) {
    console.error("GET /api/diamond/slug error:", err);
    return NextResponse.json(
      { success: false, msg: "Server error" },
      { status: 500 }
    );
  }
}

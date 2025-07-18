import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import Contact from "@/lib/models/ContactModel";

export async function GET() {
  await ConnectDB();
  const messages = await Contact.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, messages });
}

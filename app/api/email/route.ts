import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";

export async function POST(req: NextRequest) {
  await ConnectDB();
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;

    if (!email) {
      return NextResponse.json({ success: false, msg: "Email required" }, { status: 400 });
    }

    const exists = await EmailModel.findOne({ email });
    if (exists) {
      return NextResponse.json({ success: false, msg: "Already subscribed" }, { status: 409 });
    }

    await EmailModel.create({ email });
    return NextResponse.json({ success: true, msg: "Subscribed" });
  } catch (err) {
    return NextResponse.json({ success: false, msg: "Server Error" }, { status: 500 });
  }
}

export async function GET() {
  await ConnectDB();
  try {
    const emails = await EmailModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, emails });
  } catch (err) {
    return NextResponse.json({ success: false, msg: "Fetch failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await ConnectDB();
  const id = req.nextUrl.searchParams.get("id");

  try {
    if (!id) {
      return NextResponse.json({ success: false, msg: "ID required" }, { status: 400 });
    }

    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, msg: "Deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, msg: "Delete failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await ConnectDB();
  try {
    const body = await req.json();
    const { id, newEmail } = body;

    if (!id || !newEmail) {
      return NextResponse.json({ success: false, msg: "ID and new email required" }, { status: 400 });
    }

    const existing = await EmailModel.findOne({ email: newEmail });
    if (existing) {
      return NextResponse.json({ success: false, msg: "Email already exists" }, { status: 409 });
    }

    const updated = await EmailModel.findByIdAndUpdate(id, { email: newEmail }, { new: true });

    if (!updated) {
      return NextResponse.json({ success: false, msg: "Email not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, msg: "Updated", email: updated });
  } catch (err) {
    return NextResponse.json({ success: false, msg: "Update failed" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ConnectDB } from "@/lib/config/db";
import Contact from "@/lib/models/ContactModel";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
    }

    await ConnectDB();
    await Contact.create({ name, email, subject, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `[Contact] ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    return NextResponse.json({ success: true, message: "Message sent successfully." });
  } catch (err: any) {
    console.error("Internal error:", err);
    return NextResponse.json({ success: false, message: err.message || "Internal Server Error" }, { status: 500 });
  }
}

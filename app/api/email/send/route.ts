import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/src/services/emailService";
import { isValidEmail } from "@/src/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.to || !data.subject || !data.html) {
      return NextResponse.json(
        { error: "to, subject, and html are required fields" },
        { status: 400 }
      );
    }

    // Validate email addresses
    const emails = Array.isArray(data.to) ? data.to : [data.to];
    for (const email of emails) {
      if (!isValidEmail(email)) {
        return NextResponse.json(
          { error: `Invalid email address: ${email}` },
          { status: 400 }
        );
      }
    }

    // Send the email
    await emailService.sendEmail({
      to: data.to,
      subject: data.subject,
      html: data.html,
      text: data.text,
      from: data.from,
      replyTo: data.replyTo,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send email. Please try again.",
      },
      { status: 500 }
    );
  }
}

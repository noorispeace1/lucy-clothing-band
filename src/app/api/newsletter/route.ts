import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Valid email is required." },
        { status: 400 }
      );
    }

    // In a production app, persist to database or CRM (Mailchimp/Klaviyo)
    return NextResponse.json({
      success: true,
      message: "Subscribed successfully to LUCY Haute Couture newsletter.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

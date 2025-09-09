import { NextRequest, NextResponse } from "next/server";
import { sheetDBService } from "@/src/lib/sheetdb";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    if (
      !data.first_name ||
      !data.last_name ||
      !data.email ||
      !data.event_id ||
      !data.event_title
    ) {
      return NextResponse.json(
        {
          error:
            "Voornaam, achternaam, e-mail, event ID en event titel zijn verplicht",
        },
        { status: 400 }
      );
    }

    // Email validation
    if (!data.email.includes("@")) {
      return NextResponse.json(
        { error: "Voer een geldig e-mailadres in" },
        { status: 400 }
      );
    }

    // Basic name validation
    if (data.first_name.trim().length < 2 || data.last_name.trim().length < 2) {
      return NextResponse.json(
        { error: "Voer geldige voor- en achternaam in" },
        { status: 400 }
      );
    }

    // Mobile validation (optional, but if provided should be valid)
    if (data.mobile && !/^[\+]?[\d\s\-\(\)]{8,}$/.test(data.mobile.trim())) {
      return NextResponse.json(
        { error: "Voer een geldig mobiel nummer in" },
        { status: 400 }
      );
    }

    await sheetDBService.submitEventSignup({
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      email: data.email.trim().toLowerCase(),
      mobile: data.mobile?.trim() || "",
      event_id: data.event_id.trim(),
      event_title: data.event_title.trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Event aanmelding succesvol verstuurd!",
    });
  } catch (error) {
    console.error("Event signup error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}

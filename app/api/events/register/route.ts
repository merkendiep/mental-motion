import { NextRequest, NextResponse } from "next/server";
import { eventService } from "@/src/services/eventService";
import {
  isValidEmail,
  isValidName,
  isValidMobile,
  normalizeEmail,
} from "@/src/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.first_name || !data.last_name || !data.email || !data.event_id) {
      return NextResponse.json(
        {
          error: "Voornaam, achternaam, e-mail en event ID zijn verplicht",
        },
        { status: 400 },
      );
    }

    const event = await eventService.getEventById(data.event_id.trim());

    if (!event) {
      return NextResponse.json(
        { error: "Dit event bestaat niet (meer)." },
        { status: 404 },
      );
    }

    if (event.signup_enabled === false) {
      return NextResponse.json(
        {
          error:
            "Aanmelden is niet nodig voor dit openbare event. Je bent welkom om gewoon langs te komen.",
        },
        { status: 403 },
      );
    }

    // Email validation
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "Voer een geldig e-mailadres in" },
        { status: 400 },
      );
    }

    // Name validation
    if (!isValidName(data.first_name) || !isValidName(data.last_name)) {
      return NextResponse.json(
        { error: "Voer geldige voor- en achternaam in" },
        { status: 400 },
      );
    }

    // Mobile validation (optional, but if provided should be valid)
    if (data.mobile && !isValidMobile(data.mobile)) {
      return NextResponse.json(
        { error: "Voer een geldig mobiel nummer in" },
        { status: 400 },
      );
    }

    // Register the event signup using the event service
    await eventService.registerForEvent({
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      email: normalizeEmail(data.email),
      mobile: data.mobile?.trim() || "",
      event_id: data.event_id.trim(),
      event_title: event.title,
    });

    return NextResponse.json({
      success: true,
      message: "Event aanmelding succesvol verstuurd!",
    });
  } catch (error) {
    console.error("Event signup error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het opnieuw." },
      { status: 500 },
    );
  }
}

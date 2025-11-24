import { NextRequest, NextResponse } from "next/server";
import { newsletterService } from "@/src/services/newsletterService";
import { emailService } from "@/src/services/emailService";
import { isValidEmail } from "@/src/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data.email || !data.newsletters || data.newsletters.length === 0) {
      return NextResponse.json(
        { error: "E-mail en minimaal één nieuwsbrief selectie zijn verplicht" },
        { status: 400 }
      );
    }

    // Email validation using validation utility
    if (!isValidEmail(data.email)) {
      return NextResponse.json(
        { error: "Voer een geldig e-mailadres in" },
        { status: 400 }
      );
    }

    // Validate newsletter selections
    const validNewsletters = ["monthly", "quarterly", "tips"];
    const invalidNewsletters = data.newsletters.filter(
      (newsletter: string) => !validNewsletters.includes(newsletter)
    );

    if (invalidNewsletters.length > 0) {
      return NextResponse.json(
        { error: "Ongeldige nieuwsbrief selectie" },
        { status: 400 }
      );
    }

    // Subscribe using newsletter service
    const normalizedEmail = data.email.trim().toLowerCase();
    await newsletterService.subscribe({
      email: normalizedEmail,
      organization: data.organization?.trim() || undefined,
      newsletters: data.newsletters,
    });

    // Send confirmation email
    try {
      // Map newsletter IDs to readable names
      const newsletterNames = data.newsletters.map((n: string) => {
        switch (n) {
          case "monthly":
            return "Maandelijkse nieuwsbrief";
          case "quarterly":
            return "Kwartaalnieuwsbrief";
          case "tips":
            return "Tips & Tricks";
          default:
            return n;
        }
      });

      await emailService.sendNewsletterSubscriptionEmail(
        normalizedEmail,
        newsletterNames
      );
    } catch (emailError) {
      // Log error but don't fail the subscription if email fails
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json({
      success: true,
      message: "Succesvol ingeschreven voor de nieuwsbrief!",
    });
  } catch (error) {
    console.error("Newsletter form error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}

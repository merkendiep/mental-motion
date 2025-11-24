import { Resend } from "resend";

/**
 * Email Service
 * Service for sending emails using Resend
 */

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender email (can be overridden)
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

export class EmailService {
  /**
   * Send an email using Resend
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      if (!process.env.RESEND_API_KEY) {
        console.warn(
          "RESEND_API_KEY is not configured. Email will not be sent. " +
            "Please set RESEND_API_KEY in your environment variables."
        );
        // In development, log the email instead of throwing
        if (process.env.NODE_ENV === "development") {
          console.log("Email (not sent):", {
            to: options.to,
            subject: options.subject,
            from: options.from || DEFAULT_FROM,
          });
          return;
        }
        throw new Error("Email service is not configured");
      }

      const { data, error } = await resend.emails.send({
        from: options.from || DEFAULT_FROM,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
      });

      if (error) {
        console.error("Error sending email:", error);
        throw new Error(`Failed to send email: ${error.message}`);
      }

      console.log("Email sent successfully:", data?.id);
    } catch (error) {
      console.error("Email service error:", error);
      throw error;
    }
  }

  /**
   * Send event registration confirmation email
   */
  async sendEventRegistrationEmail(
    email: string,
    firstName: string,
    eventTitle: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string
  ): Promise<void> {
    const html = this.generateEventRegistrationEmailHtml(
      firstName,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation
    );

    const text = this.generateEventRegistrationEmailText(
      firstName,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation
    );

    await this.sendEmail({
      to: email,
      subject: `Bevestiging aanmelding: ${eventTitle}`,
      html,
      text,
    });
  }

  /**
   * Send newsletter subscription confirmation email
   */
  async sendNewsletterSubscriptionEmail(
    email: string,
    newsletters: string[]
  ): Promise<void> {
    const html = this.generateNewsletterSubscriptionEmailHtml(newsletters);
    const text = this.generateNewsletterSubscriptionEmailText(newsletters);

    await this.sendEmail({
      to: email,
      subject: "Bevestiging nieuwsbrief aanmelding - Mental Motion",
      html,
      text,
    });
  }

  /**
   * Generate HTML for event registration confirmation email
   */
  private generateEventRegistrationEmailHtml(
    firstName: string,
    eventTitle: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string
  ): string {
    // Escape all user inputs to prevent XSS
    const safeFirstName = escapeHtml(firstName);
    const safeEventTitle = escapeHtml(eventTitle);
    const safeEventDate = escapeHtml(eventDate);
    const safeEventTime = escapeHtml(eventTime);
    const safeEventLocation = escapeHtml(eventLocation);

    return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Registratie Bevestiging</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
    <h1 style="color: #2c3e50; margin-top: 0;">Bedankt voor je aanmelding! 🎉</h1>
    <p style="font-size: 16px;">Hoi ${safeFirstName},</p>
    <p style="font-size: 16px;">
      Je bent succesvol aangemeld voor het volgende evenement:
    </p>
  </div>
  
  <div style="background-color: #ffffff; border-left: 4px solid #3498db; padding: 20px; margin-bottom: 20px;">
    <h2 style="color: #3498db; margin-top: 0;">${safeEventTitle}</h2>
    <p style="margin: 10px 0;"><strong>📅 Datum:</strong> ${safeEventDate}</p>
    <p style="margin: 10px 0;"><strong>🕐 Tijd:</strong> ${safeEventTime}</p>
    <p style="margin: 10px 0;"><strong>📍 Locatie:</strong> ${safeEventLocation}</p>
  </div>
  
  <div style="background-color: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
    <p style="font-size: 14px; margin: 10px 0;">
      We kijken ernaar uit je te zien! Als je vragen hebt, neem dan gerust contact met ons op.
    </p>
  </div>
  
  <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; font-size: 12px; color: #666;">
    <p>Met vriendelijke groet,<br>Het Mental Motion team</p>
    <p style="margin-top: 20px;">
      Dit is een automatisch gegenereerde e-mail. Reageer niet op dit bericht.
    </p>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generate plain text for event registration confirmation email
   */
  private generateEventRegistrationEmailText(
    firstName: string,
    eventTitle: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string
  ): string {
    return `
Bedankt voor je aanmelding!

Hoi ${firstName},

Je bent succesvol aangemeld voor het volgende evenement:

${eventTitle}

Datum: ${eventDate}
Tijd: ${eventTime}
Locatie: ${eventLocation}

We kijken ernaar uit je te zien! Als je vragen hebt, neem dan gerust contact met ons op.

Met vriendelijke groet,
Het Mental Motion team

Dit is een automatisch gegenereerde e-mail. Reageer niet op dit bericht.
    `.trim();
  }

  /**
   * Generate HTML for newsletter subscription confirmation email
   */
  private generateNewsletterSubscriptionEmailHtml(
    newsletters: string[]
  ): string {
    // Escape newsletter names to prevent XSS
    const newslettersList = newsletters
      .map((n) => `<li style="margin: 5px 0;">${escapeHtml(n)}</li>`)
      .join("");

    return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwsbrief Aanmelding Bevestiging</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f8f9fa; border-radius: 10px; padding: 30px; margin-bottom: 20px;">
    <h1 style="color: #2c3e50; margin-top: 0;">Welkom bij Mental Motion! 📬</h1>
    <p style="font-size: 16px;">
      Bedankt voor je aanmelding voor onze nieuwsbrief(ven). Je ontvangt nu updates over:
    </p>
  </div>
  
  <div style="background-color: #ffffff; border-left: 4px solid #27ae60; padding: 20px; margin-bottom: 20px;">
    <ul style="margin: 10px 0; padding-left: 20px;">
      ${newslettersList}
    </ul>
  </div>
  
  <div style="background-color: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
    <p style="font-size: 14px; margin: 10px 0;">
      We houden je op de hoogte van onze activiteiten, evenementen en nieuws. 
      Je kunt je altijd afmelden via de link onderaan onze nieuwsbrieven.
    </p>
  </div>
  
  <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px; font-size: 12px; color: #666;">
    <p>Met vriendelijke groet,<br>Het Mental Motion team</p>
    <p style="margin-top: 20px;">
      Dit is een automatisch gegenereerde e-mail. Reageer niet op dit bericht.
    </p>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generate plain text for newsletter subscription confirmation email
   */
  private generateNewsletterSubscriptionEmailText(
    newsletters: string[]
  ): string {
    const newslettersList = newsletters.map((n) => `- ${n}`).join("\n");

    return `
Welkom bij Mental Motion!

Bedankt voor je aanmelding voor onze nieuwsbrief(ven). Je ontvangt nu updates over:

${newslettersList}

We houden je op de hoogte van onze activiteiten, evenementen en nieuws. 
Je kunt je altijd afmelden via de link onderaan onze nieuwsbrieven.

Met vriendelijke groet,
Het Mental Motion team

Dit is een automatisch gegenereerde e-mail. Reageer niet op dit bericht.
    `.trim();
  }
}

// Export a singleton instance
export const emailService = new EmailService();

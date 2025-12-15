/**
 * Server-only HTML sanitization using DOMPurify with jsdom
 * This module must only be imported in server components or API routes
 */
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// Create a DOMPurify instance for server-side use
const window = new JSDOM("").window;
const purify = DOMPurify(window);

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param html - Raw HTML content
 * @param allowedTags - Optional array of allowed HTML tags
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string, allowedTags?: string[]): string {
  if (!html) return "";

  const config = allowedTags
    ? {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: ["href", "target", "rel", "class"],
      }
    : {
        // Default configuration allows common formatting tags
        // Note: div and span only allowed with class attribute for styling
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "s",
          "a",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "ul",
          "ol",
          "li",
          "blockquote",
          "code",
          "pre",
          "hr",
        ],
        // Restrict attributes - no id to prevent DOM manipulation
        ALLOWED_ATTR: ["href", "target", "rel", "class"],
        // Ensure links are safe
        ALLOWED_URI_REGEXP:
          /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      };

  return purify.sanitize(html, config);
}

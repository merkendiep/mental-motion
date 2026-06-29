/**
 * Server-only HTML sanitization using sanitize-html
 * This module must only be imported in server components or API routes
 */
import sanitize from "sanitize-html";

const DEFAULT_ALLOWED_TAGS = [
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
];

const DEFAULT_ALLOWED_ATTRIBUTES: sanitize.IOptions["allowedAttributes"] = {
  a: ["href", "target", "rel"],
  "*": ["class"],
};

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param html - Raw HTML content
 * @param allowedTags - Optional array of allowed HTML tags
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string, allowedTags?: string[]): string {
  if (!html) return "";

  return sanitize(html, {
    allowedTags: allowedTags ?? DEFAULT_ALLOWED_TAGS,
    allowedAttributes: allowedTags
      ? { a: ["href", "target", "rel"], "*": ["class"] }
      : DEFAULT_ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto", "tel"],
  });
}

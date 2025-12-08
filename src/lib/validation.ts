/**
 * Utility functions for validation and data normalization
 */

/**
 * Sanitize string input by trimming whitespace
 * @param input - Raw string input
 * @returns Sanitized string with leading/trailing whitespace removed
 */
export function sanitizeString(input: string): string {
  return input.trim();
}

/**
 * Sanitize an object by trimming all string values
 * @param obj - Object with string values to sanitize
 * @returns New object with sanitized string values
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = {} as T;
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value) as T[typeof key];
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item: any) =>
        typeof item === "string" ? sanitizeString(item) : item
      ) as T[typeof key];
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}

/**
 * Normalize email address to lowercase and trim whitespace
 * @param email - Raw email input
 * @returns Normalized email address
 */
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Validate email format
 * Uses a basic check that's safe from ReDoS attacks
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  // Basic validation without complex regex to avoid ReDoS
  if (!email || email.length > 254) return false; // RFC 5321 max length
  if (email.includes("..")) return false; // No consecutive dots

  const parts = email.split("@");
  if (parts.length !== 2) return false; // Must have exactly one @

  const [localPart, domain] = parts;
  if (!localPart || !domain) return false;
  if (localPart.length > 64) return false; // RFC 5321 local part max

  // Domain must have at least one dot and valid characters
  if (!domain.includes(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;

  // Check for invalid characters (basic check)
  const validChars = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  if (!validChars.test(localPart)) return false;

  const domainValidChars = /^[a-zA-Z0-9.-]+$/;
  if (!domainValidChars.test(domain)) return false;

  return true;
}

/**
 * Validate mobile phone number
 * Note: This is a basic validation that accepts international formats.
 * Expected formats:
 * - +31 6 12345678
 * - 06-12345678
 * - 0612345678
 * - +31612345678
 *
 * For more robust international phone validation, consider using
 * a library like libphonenumber-js or google-libphonenumber
 *
 * @param mobile - Mobile phone number to validate
 * @returns true if mobile is valid, false otherwise
 */
export function isValidMobile(mobile: string): boolean {
  // Matches: optional +, digits, spaces, dashes, parentheses, minimum 8 chars
  const mobileRegex = /^[\+]?[\d\s\-\(\)]{8,}$/;
  return mobileRegex.test(mobile.trim());
}

/**
 * Validate name (first name or last name)
 * @param name - Name to validate
 * @param minLength - Minimum length (default: 2)
 * @returns true if name is valid, false otherwise
 */
export function isValidName(name: string, minLength: number = 2): boolean {
  return name.trim().length >= minLength;
}

/**
 * Utility functions for validation and data normalization
 */

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
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

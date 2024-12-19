import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export function sanitizeHtml(html: string): string {
  // Basic XSS prevention
  return html
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function validateInput(input: string): boolean {
  // Add input validation rules
  const hasSpecialChars = /[<>'"()]/.test(input);
  const hasValidLength = input.length <= 1000;
  return !hasSpecialChars && hasValidLength;
}
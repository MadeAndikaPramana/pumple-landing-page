export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Strict enough to catch common typos, loose enough for every valid address
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_RE.test(email);
}

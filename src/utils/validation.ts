/**
 * Email validation check conforming to standard format requirement.
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates first name (required, non-empty, letters, spaces, hyphens).
 */
export function validateFirstName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length < 1) return false;
  const nameRegex = /^[A-Za-z\s'-]+$/;
  return nameRegex.test(trimmed);
}

/**
 * Validates last name (optional; if entered, must contain valid characters).
 */
export function validateLastName(name: string): boolean {
  if (!name || typeof name !== 'string') return true;
  const trimmed = name.trim();
  if (trimmed.length === 0) return true;
  const nameRegex = /^[A-Za-z\s'-]+$/;
  return nameRegex.test(trimmed);
}

/**
 * Formats a raw phone string into (XXX) XXX-XXXX format.
 */
export function formatPhoneNumber(text: string): string {
  if (!text) return '';
  const cleaned = text.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return text;
  
  const [, part1, part2, part3] = match;
  if (part3) {
    return `(${part1}) ${part2}-${part3}`;
  } else if (part2) {
    return `(${part1}) ${part2}`;
  } else if (part1) {
    return part1.length === 3 ? `(${part1}) ` : part1;
  }
  return '';
}

/**
 * Validates phone number (optional, but if provided should be 10 digits).
 */
export function validatePhoneNumber(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return true;
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 0) return true;
  return cleaned.length === 10;
}

/**
 * Returns initials from first name and last name for avatar display.
 */
export function getInitials(firstName?: string, lastName?: string): string {
  const f = (firstName || '').trim();
  const l = (lastName || '').trim();
  if (f && l) {
    return `${f.charAt(0)}${l.charAt(0)}`.toUpperCase();
  }
  if (f) {
    return f.substring(0, Math.min(2, f.length)).toUpperCase();
  }
  return 'LL';
}

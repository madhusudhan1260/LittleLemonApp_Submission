import {
  validateEmail,
  validateFirstName,
  validateLastName,
  formatPhoneNumber,
  validatePhoneNumber,
  getInitials,
} from '../src/utils/validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('accepts valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@sub.domain.org')).toBe(true);
      expect(validateEmail('chef.lemon@restaurant.co')).toBe(true);
    });

    it('rejects invalid email formats', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('   ')).toBe(false);
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('missing@domain')).toBe(false);
      expect(validateEmail('missingdomain.com')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
      expect(validateEmail('spaces in@email.com')).toBe(false);
    });
  });

  describe('validateFirstName', () => {
    it('accepts valid names', () => {
      expect(validateFirstName('John')).toBe(true);
      expect(validateFirstName('Mary-Jane')).toBe(true);
      expect(validateFirstName("O'Connor")).toBe(true);
      expect(validateFirstName('Jean Pierre')).toBe(true);
    });

    it('rejects empty or invalid names', () => {
      expect(validateFirstName('')).toBe(false);
      expect(validateFirstName('   ')).toBe(false);
      expect(validateFirstName('John123')).toBe(false);
      expect(validateFirstName('!@#$%')).toBe(false);
    });
  });

  describe('validateLastName', () => {
    it('accepts valid last names or empty strings (since optional initially)', () => {
      expect(validateLastName('')).toBe(true);
      expect(validateLastName('Doe')).toBe(true);
      expect(validateLastName('Smith-Jones')).toBe(true);
    });

    it('rejects invalid characters in last name', () => {
      expect(validateLastName('Doe123')).toBe(false);
      expect(validateLastName('***')).toBe(false);
    });
  });

  describe('formatPhoneNumber', () => {
    it('formats a 10-digit number to (XXX) XXX-XXXX', () => {
      expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
    });

    it('handles partial phone inputs gracefully', () => {
      expect(formatPhoneNumber('123')).toBe('(123) ');
      expect(formatPhoneNumber('123456')).toBe('(123) 456');
    });

    it('handles empty input', () => {
      expect(formatPhoneNumber('')).toBe('');
    });
  });

  describe('validatePhoneNumber', () => {
    it('accepts empty phone (optional field)', () => {
      expect(validatePhoneNumber('')).toBe(true);
      expect(validatePhoneNumber('   ')).toBe(true);
    });

    it('accepts valid 10-digit formatted or raw numbers', () => {
      expect(validatePhoneNumber('1234567890')).toBe(true);
      expect(validatePhoneNumber('(123) 456-7890')).toBe(true);
    });

    it('rejects incomplete numbers', () => {
      expect(validatePhoneNumber('12345')).toBe(false);
      expect(validatePhoneNumber('(123) 45')).toBe(false);
    });
  });

  describe('getInitials', () => {
    it('returns two letters for first and last name', () => {
      expect(getInitials('John', 'Doe')).toBe('JD');
      expect(getInitials('alex', 'smith')).toBe('AS');
    });

    it('returns first two letters of first name when last name is missing', () => {
      expect(getInitials('John')).toBe('JO');
      expect(getInitials('J')).toBe('J');
    });

    it('returns default fallback LL when name is empty', () => {
      expect(getInitials('', '')).toBe('LL');
      expect(getInitials(undefined, undefined)).toBe('LL');
    });
  });
});

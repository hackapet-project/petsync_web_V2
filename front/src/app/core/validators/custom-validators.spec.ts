import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

describe('CustomValidators', () => {
  describe('noWhitespace', () => {
    it('should pass for valid input', () => {
      const control = new FormControl('valid input');
      const result = CustomValidators.noWhitespace()(control);
      expect(result).toBeNull();
    });

    it('should fail for whitespace-only input', () => {
      const control = new FormControl('   ');
      const result = CustomValidators.noWhitespace()(control);
      expect(result).toEqual({ whitespace: true });
    });

    it('should pass for empty input', () => {
      const control = new FormControl('');
      const result = CustomValidators.noWhitespace()(control);
      expect(result).toBeNull();
    });
  });

  describe('emailFormat', () => {
    it('should pass for valid email', () => {
      const control = new FormControl('test@example.com');
      const result = CustomValidators.emailFormat()(control);
      expect(result).toBeNull();
    });

    it('should fail for invalid email format', () => {
      const control = new FormControl('invalid-email');
      const result = CustomValidators.emailFormat()(control);
      expect(result).toEqual({ emailFormat: true });
    });

    it('should pass for empty input', () => {
      const control = new FormControl('');
      const result = CustomValidators.emailFormat()(control);
      expect(result).toBeNull();
    });
  });

  describe('allowedEmailDomains', () => {
    const validator = CustomValidators.allowedEmailDomains(['example.com', 'test.org']);

    it('should pass for allowed domain', () => {
      const control = new FormControl('user@example.com');
      const result = validator(control);
      expect(result).toBeNull();
    });

    it('should fail for disallowed domain', () => {
      const control = new FormControl('user@gmail.com');
      const result = validator(control);
      expect(result).toEqual({
        emailDomain: {
          allowedDomains: ['example.com', 'test.org'],
          actualDomain: 'gmail.com'
        }
      });
    });

    it('should pass for empty input', () => {
      const control = new FormControl('');
      const result = validator(control);
      expect(result).toBeNull();
    });
  });
});
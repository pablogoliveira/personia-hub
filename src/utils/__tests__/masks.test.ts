
import { describe, it, expect } from 'vitest';
import { cpfMask, phoneMask, cepMask, rgMask, applyMask } from '../masks';

describe('Masks utility', () => {
  describe('cpfMask', () => {
    it('should format CPF correctly', () => {
      expect(cpfMask('12345678900')).toBe('123.456.789-00');
      expect(cpfMask('123456789')).toBe('123.456.789');
      expect(cpfMask('1234567')).toBe('123.456.7');
    });

    it('should handle partial CPF input', () => {
      expect(cpfMask('123')).toBe('123');
      expect(cpfMask('1234')).toBe('123.4');
    });

    it('should remove non-digit characters', () => {
      expect(cpfMask('123.456.789-00')).toBe('123.456.789-00');
      expect(cpfMask('abc123def456ghi789jkl00')).toBe('123.456.789-00');
    });
  });

  describe('phoneMask', () => {
    it('should format phone numbers correctly', () => {
      expect(phoneMask('1234567890')).toBe('(12) 3456-7890');
      expect(phoneMask('12345678901')).toBe('(12) 34567-8901');
    });

    it('should handle partial phone input', () => {
      expect(phoneMask('12')).toBe('(12) ');
      expect(phoneMask('123')).toBe('(12) 3');
    });

    it('should remove non-digit characters', () => {
      expect(phoneMask('(12) 3456-7890')).toBe('(12) 3456-7890');
      expect(phoneMask('abc12def3456ghi7890')).toBe('(12) 3456-7890');
    });
  });

  describe('cepMask', () => {
    it('should format CEP correctly', () => {
      expect(cepMask('12345678')).toBe('12345-678');
    });

    it('should handle partial CEP input', () => {
      expect(cepMask('12345')).toBe('12345');
      expect(cepMask('123456')).toBe('12345-6');
    });

    it('should remove non-digit characters', () => {
      expect(cepMask('12345-678')).toBe('12345-678');
      expect(cepMask('abc12345def678')).toBe('12345-678');
    });
  });

  describe('rgMask', () => {
    it('should format RG correctly', () => {
      expect(rgMask('123456789')).toBe('12.345.678-9');
    });

    it('should handle partial RG input', () => {
      expect(rgMask('123')).toBe('12.3');
      expect(rgMask('1234')).toBe('12.34');
    });

    it('should remove non-digit characters', () => {
      expect(rgMask('12.345.678-9')).toBe('12.345.678-9');
      expect(rgMask('abc12def345ghi678jkl9')).toBe('12.345.678-9');
    });
  });

  describe('applyMask', () => {
    it('should apply the correct mask based on field name', () => {
      expect(applyMask('cpf', '12345678900')).toBe('123.456.789-00');
      expect(applyMask('telefone', '12345678901')).toBe('(12) 34567-8901');
      expect(applyMask('cep', '12345678')).toBe('12345-678');
      expect(applyMask('rg', '123456789')).toBe('12.345.678-9');
    });

    it('should return original value for unknown field names', () => {
      expect(applyMask('unknown', '12345678900')).toBe('12345678900');
    });
  });
});

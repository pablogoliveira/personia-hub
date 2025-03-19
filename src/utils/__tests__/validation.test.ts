
import { describe, it, expect } from 'vitest';
import { validateField } from '../validation';

describe('validateField', () => {
  describe('nome field', () => {
    it('should return error when nome is empty', () => {
      expect(validateField('nome', '')).toBe('O nome é obrigatório');
      expect(validateField('nome', '  ')).toBe('O nome é obrigatório');
    });

    it('should return error when nome is too short', () => {
      expect(validateField('nome', 'Jo')).toBe('O nome deve ter pelo menos 3 caracteres');
    });

    it('should return null for valid nome', () => {
      expect(validateField('nome', 'João Silva')).toBeNull();
    });
  });

  describe('dataNascimento field', () => {
    it('should return error when dataNascimento is empty', () => {
      expect(validateField('dataNascimento', '')).toBe('A data de nascimento é obrigatória');
    });

    it('should return error when dataNascimento is in the future', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      expect(validateField('dataNascimento', futureDate.toISOString().slice(0, 10))).toBe('A data de nascimento não pode ser no futuro');
    });

    it('should return null for valid dataNascimento', () => {
      const pastDate = new Date();
      pastDate.setFullYear(pastDate.getFullYear() - 20);
      expect(validateField('dataNascimento', pastDate.toISOString().slice(0, 10))).toBeNull();
    });
  });

  describe('nomeMae field', () => {
    it('should return error when nomeMae is empty', () => {
      expect(validateField('nomeMae', '')).toBe('O nome da mãe é obrigatório');
      expect(validateField('nomeMae', '  ')).toBe('O nome da mãe é obrigatório');
    });

    it('should return error when nomeMae is too short', () => {
      expect(validateField('nomeMae', 'An')).toBe('O nome da mãe deve ter pelo menos 3 caracteres');
    });

    it('should return null for valid nomeMae', () => {
      expect(validateField('nomeMae', 'Maria Silva')).toBeNull();
    });
  });

  describe('cpf field', () => {
    it('should return error when cpf is empty', () => {
      expect(validateField('cpf', '')).toBe('O CPF é obrigatório');
      expect(validateField('cpf', '  ')).toBe('O CPF é obrigatório');
    });

    it('should return error when cpf has invalid format', () => {
      expect(validateField('cpf', '123')).toBe('CPF deve conter 11 dígitos');
    });

    it('should return error when cpf has all same digits', () => {
      expect(validateField('cpf', '11111111111')).toBe('CPF inválido');
    });

    it('should return error for invalid cpf checksum', () => {
      expect(validateField('cpf', '12345678901')).toBe('CPF inválido');
    });

    it('should return null for valid cpf', () => {
      // Valid CPF for testing
      expect(validateField('cpf', '52998224725')).toBeNull();
    });
  });

  describe('cep field', () => {
    it('should return error when cep is empty', () => {
      expect(validateField('cep', '')).toBe('O CEP é obrigatório');
      expect(validateField('cep', '  ')).toBe('O CEP é obrigatório');
    });

    it('should return error when cep has invalid format', () => {
      expect(validateField('cep', '1234')).toBe('CEP inválido');
    });

    it('should return null for valid cep', () => {
      expect(validateField('cep', '12345678')).toBeNull();
      expect(validateField('cep', '12345-678')).toBeNull();
    });
  });

  describe('email field', () => {
    it('should return error when email is empty', () => {
      expect(validateField('email', '')).toBe('O e-mail é obrigatório');
      expect(validateField('email', '  ')).toBe('O e-mail é obrigatório');
    });

    it('should return error when email has invalid format', () => {
      expect(validateField('email', 'invalidemail')).toBe('E-mail inválido');
      expect(validateField('email', 'invalid@')).toBe('E-mail inválido');
      expect(validateField('email', 'invalid@domain')).toBe('E-mail inválido');
    });

    it('should return null for valid email', () => {
      expect(validateField('email', 'valid@example.com')).toBeNull();
    });
  });

  describe('required fields', () => {
    it('should validate logradouro as required', () => {
      expect(validateField('logradouro', '')).toBe('O logradouro é obrigatório');
      expect(validateField('logradouro', 'Rua Exemplo')).toBeNull();
    });

    it('should validate numero as required', () => {
      expect(validateField('numero', '')).toBe('O número é obrigatório');
      expect(validateField('numero', '123')).toBeNull();
    });

    it('should validate bairro as required', () => {
      expect(validateField('bairro', '')).toBe('O bairro é obrigatório');
      expect(validateField('bairro', 'Centro')).toBeNull();
    });

    it('should validate cidade as required', () => {
      expect(validateField('cidade', '')).toBe('A cidade é obrigatória');
      expect(validateField('cidade', 'São Paulo')).toBeNull();
    });

    it('should validate estado as required and check length', () => {
      expect(validateField('estado', '')).toBe('O estado é obrigatório');
      expect(validateField('estado', 'S')).toBe('O estado deve ter 2 caracteres');
      expect(validateField('estado', 'SPX')).toBe('O estado deve ter 2 caracteres');
      expect(validateField('estado', 'SP')).toBeNull();
    });

    it('should validate telefone as required and check format', () => {
      expect(validateField('telefone', '')).toBe('O telefone é obrigatório');
      expect(validateField('telefone', '123')).toBe('Telefone deve ter 10 ou 11 dígitos (com DDD)');
      expect(validateField('telefone', '1234567890')).toBeNull();
      expect(validateField('telefone', '12987654321')).toBeNull();
      expect(validateField('telefone', '12087654321')).toBe('Celular deve começar com 9 após o DDD');
    });
  });
});

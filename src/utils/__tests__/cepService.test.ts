
import { describe, it, expect, vi, beforeEach } from 'vitest';
import fetchAddressFromCep from '../cepService';

global.fetch = vi.fn();

describe('fetchAddressFromCep', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return null when cep is less than 8 digits', async () => {
    const result = await fetchAddressFromCep('1234');
    expect(result).toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should return null when API returns error', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ erro: true }),
    });

    const result = await fetchAddressFromCep('12345678');
    expect(result).toBeNull();
    expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
  });

  it('should return address data when API call is successful', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({
        logradouro: 'Rua Exemplo',
        bairro: 'Bairro Teste',
        localidade: 'Cidade Teste',
        uf: 'SP',
      }),
    });

    const result = await fetchAddressFromCep('12345678');
    expect(result).toEqual({
      logradouro: 'Rua Exemplo',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      estado: 'SP',
    });
    expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
  });

  it('should format cep correctly by removing non-digit characters', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({}),
    });

    await fetchAddressFromCep('12.345-678');
    expect(fetch).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
  });

  it('should return null when fetch throws an error', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));
    
    const result = await fetchAddressFromCep('12345678');
    expect(result).toBeNull();
  });
});

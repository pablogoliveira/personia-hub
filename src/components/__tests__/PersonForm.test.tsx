
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PersonForm from '../PersonForm';
import fetchAddressFromCep from '../../utils/cepService';

// Mock the CEP service
vi.mock('../../utils/cepService');
// Mock the toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  }
}));

describe('PersonForm Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the initial form step with personal data fields', () => {
    render(<PersonForm />);
    
    // Check if personal data fields are displayed in step 1
    expect(screen.getByLabelText(/Nome Completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de Nascimento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome da Mãe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/RG/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    
    // Check if address fields are not displayed yet
    expect(screen.queryByLabelText(/CEP/i)).not.toBeInTheDocument();
  });

  it('moves to the next step when "Próximo" button is clicked with valid data', async () => {
    render(<PersonForm />);
    
    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/Nome Completo/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), { 
      target: { value: '1990-01-01' } 
    });
    fireEvent.change(screen.getByLabelText(/Nome da Mãe/i), { target: { value: 'Maria Silva' } });
    fireEvent.change(screen.getByLabelText(/RG/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: '52998224725' } });
    
    // Click next button
    fireEvent.click(screen.getByText('Próximo'));
    
    // Check if we moved to address step
    await waitFor(() => {
      expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
    });
  });

  it('shows error toast when trying to proceed with invalid data', async () => {
    const { toast } = await import('sonner');
    
    render(<PersonForm />);
    
    // Click next without filling required fields
    fireEvent.click(screen.getByText('Próximo'));
    
    // Check if error toast was shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringContaining('preencha todos os campos')
      );
    });
  });

  it('fetches address data when a valid CEP is entered', async () => {
    (fetchAddressFromCep as any).mockResolvedValue({
      logradouro: 'Rua Exemplo',
      bairro: 'Bairro Teste',
      cidade: 'Cidade Teste',
      estado: 'SP',
    });
    
    render(<PersonForm />);
    
    // Fill in first step fields and proceed to address step
    fireEvent.change(screen.getByLabelText(/Nome Completo/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), { 
      target: { value: '1990-01-01' } 
    });
    fireEvent.change(screen.getByLabelText(/Nome da Mãe/i), { target: { value: 'Maria Silva' } });
    fireEvent.change(screen.getByLabelText(/RG/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: '52998224725' } });
    
    // Click next button
    fireEvent.click(screen.getByText('Próximo'));
    
    // Now on address step, enter CEP
    await waitFor(() => {
      const cepInput = screen.getByLabelText(/CEP/i);
      fireEvent.change(cepInput, { target: { value: '12345678' } });
      fireEvent.blur(cepInput);
    });
    
    // Check if address fields were populated
    await waitFor(() => {
      expect(fetchAddressFromCep).toHaveBeenCalledWith('12345678');
      expect(screen.getByLabelText(/Logradouro/i)).toHaveValue('Rua Exemplo');
      expect(screen.getByLabelText(/Bairro/i)).toHaveValue('Bairro Teste');
      expect(screen.getByLabelText(/Cidade/i)).toHaveValue('Cidade Teste');
      expect(screen.getByLabelText(/Estado/i)).toHaveValue('SP');
    });
  });

  it('allows navigation between form steps', async () => {
    render(<PersonForm />);
    
    // Fill in required fields for first step
    fireEvent.change(screen.getByLabelText(/Nome Completo/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), { 
      target: { value: '1990-01-01' } 
    });
    fireEvent.change(screen.getByLabelText(/Nome da Mãe/i), { target: { value: 'Maria Silva' } });
    fireEvent.change(screen.getByLabelText(/RG/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: '52998224725' } });
    
    // Move to next step
    fireEvent.click(screen.getByText('Próximo'));
    
    // Fill in required fields for address step
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/CEP/i), { target: { value: '12345678' } });
      fireEvent.change(screen.getByLabelText(/Logradouro/i), { target: { value: 'Rua Exemplo' } });
      fireEvent.change(screen.getByLabelText(/Número/i), { target: { value: '123' } });
      fireEvent.change(screen.getByLabelText(/Bairro/i), { target: { value: 'Bairro Teste' } });
      fireEvent.change(screen.getByLabelText(/Cidade/i), { target: { value: 'Cidade Teste' } });
      fireEvent.change(screen.getByLabelText(/Estado/i), { target: { value: 'SP' } });
    });
    
    // Move to next step
    fireEvent.click(screen.getByText('Próximo'));
    
    // Check if we're on contact step
    await waitFor(() => {
      expect(screen.getByLabelText(/Telefone com DDD/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    });
    
    // Go back to address step
    fireEvent.click(screen.getByText('Anterior'));
    
    // Check if we're back on address step
    await waitFor(() => {
      expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
    });
  });

  it('submits the form and shows success message when all data is valid', async () => {
    const { toast } = await import('sonner');
    
    // Mock setTimeout
    vi.useFakeTimers();
    
    render(<PersonForm />);
    
    // Fill in all steps and submit
    // Step 1
    fireEvent.change(screen.getByLabelText(/Nome Completo/i), { target: { value: 'João Silva' } });
    fireEvent.change(screen.getByLabelText(/Data de Nascimento/i), { 
      target: { value: '1990-01-01' } 
    });
    fireEvent.change(screen.getByLabelText(/Nome da Mãe/i), { target: { value: 'Maria Silva' } });
    fireEvent.change(screen.getByLabelText(/RG/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: '52998224725' } });
    fireEvent.click(screen.getByText('Próximo'));
    
    // Step 2
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/CEP/i), { target: { value: '12345678' } });
      fireEvent.change(screen.getByLabelText(/Logradouro/i), { target: { value: 'Rua Exemplo' } });
      fireEvent.change(screen.getByLabelText(/Número/i), { target: { value: '123' } });
      fireEvent.change(screen.getByLabelText(/Bairro/i), { target: { value: 'Centro' } });
      fireEvent.change(screen.getByLabelText(/Cidade/i), { target: { value: 'São Paulo' } });
      fireEvent.change(screen.getByLabelText(/Estado/i), { target: { value: 'SP' } });
    });
    fireEvent.click(screen.getByText('Próximo'));
    
    // Step 3
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Telefone com DDD/i), { 
        target: { value: '1198765432' } 
      });
      fireEvent.change(screen.getByLabelText(/E-mail/i), { 
        target: { value: 'joao@example.com' } 
      });
    });
    
    // Submit form
    fireEvent.click(screen.getByText('Finalizar Cadastro'));
    
    // Check for loading state
    expect(screen.getByText('Enviando...')).toBeInTheDocument();
    
    // Wait for submission to complete
    await vi.runAllTimersAsync();
    
    // Check for success toast
    expect(toast.success).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
    
    // Check for success message after timeout
    await vi.runAllTimersAsync();
    
    // Check for success screen
    await waitFor(() => {
      expect(screen.getByText('Cadastro Realizado')).toBeInTheDocument();
    });
    
    vi.useRealTimers();
  });
});

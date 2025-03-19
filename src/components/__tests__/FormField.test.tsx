
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField from '../FormField';

describe('FormField Component', () => {
  const defaultProps = {
    id: 'testField',
    name: 'testField',
    label: 'Test Field',
    value: '',
    onChange: vi.fn(),
    onBlur: vi.fn(),
  };

  it('renders correctly with default props', () => {
    render(<FormField {...defaultProps} />);
    
    expect(screen.getByLabelText(/Test Field/)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows asterisk for required fields', () => {
    render(<FormField {...defaultProps} required={true} />);
    
    const label = screen.getByText('Test Field');
    expect(label.parentElement).toHaveTextContent('*');
  });

  it('does not show asterisk for non-required fields', () => {
    render(<FormField {...defaultProps} required={false} />);
    
    const label = screen.getByText('Test Field');
    expect(label.parentElement).not.toHaveTextContent('*');
  });

  it('displays error message when touched and error is provided', () => {
    render(<FormField {...defaultProps} touched={true} error="This field is required" />);
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not display error message when not touched', () => {
    render(<FormField {...defaultProps} touched={false} error="This field is required" />);
    
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<FormField {...defaultProps} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test value' } });
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('calls onBlur when input loses focus', () => {
    render(<FormField {...defaultProps} />);
    
    fireEvent.blur(screen.getByRole('textbox'));
    
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('applies mask when mask prop is true', () => {
    const mockOnChange = vi.fn();
    
    render(
      <FormField 
        {...defaultProps} 
        name="cpf" 
        value="12345678900" 
        onChange={mockOnChange} 
        mask={true} 
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('123.456.789-00');
    
    fireEvent.change(input, { target: { value: '123.456.789-00A' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('handles maxLength prop correctly', () => {
    render(<FormField {...defaultProps} maxLength={5} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '5');
  });

  it('sets placeholder correctly', () => {
    render(<FormField {...defaultProps} placeholder="Enter value here" />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter value here');
  });

  it('sets disabled state correctly', () => {
    render(<FormField {...defaultProps} disabled={true} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<FormField {...defaultProps} className="custom-class" />);
    
    const formField = screen.getByTestId(/form-field/i) || document.querySelector('.form-field');
    expect(formField).toHaveClass('custom-class');
  });
});

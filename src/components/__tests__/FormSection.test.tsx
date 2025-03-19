
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormSection from '../FormSection';

describe('FormSection Component', () => {
  it('renders title correctly', () => {
    render(
      <FormSection title="Personal Information">
        <div>Content</div>
      </FormSection>
    );
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <FormSection 
        title="Personal Information" 
        description="Please fill in your personal details"
      >
        <div>Content</div>
      </FormSection>
    );
    
    expect(screen.getByText('Please fill in your personal details')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <FormSection title="Personal Information">
        <div data-testid="test-child">Child Content</div>
      </FormSection>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(
      <FormSection title="Personal Information" className="custom-class">
        <div>Content</div>
      </FormSection>
    );
    
    // Check if the custom class is applied to the Card component
    const card = document.querySelector('.custom-class');
    expect(card).toBeInTheDocument();
  });

  it('applies default styling', () => {
    render(
      <FormSection title="Personal Information">
        <div>Content</div>
      </FormSection>
    );
    
    // Check if the default classes are applied
    const card = document.querySelector('.border.shadow-sm.mb-6');
    expect(card).toBeInTheDocument();
  });
});

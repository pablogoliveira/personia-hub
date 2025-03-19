
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { applyMask } from '@/utils/masks';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  mask?: boolean;
  maxLength?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched = false,
  type = 'text',
  placeholder,
  disabled = false,
  required = true,
  autoComplete,
  className,
  mask = false,
  maxLength,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    if (mask) {
      setDisplayValue(applyMask(name, value));
    } else {
      setDisplayValue(value);
    }
  }, [value, mask, name]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (mask) {
      // Pass the raw value to parent component
      e.target.value = newValue.replace(/\D/g, '');
      onChange(e);
    } else {
      onChange(e);
    }
  };
  
  const showError = touched && error;
  
  return (
    <div className={cn("form-field space-y-2", className)}>
      <Label
        htmlFor={id}
        className={cn(
          "text-sm font-normal transition-colors",
          showError ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={type}
          value={displayValue}
          onChange={handleChange}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          className={cn(
            "input-transition h-10",
            showError ? "border-destructive focus:border-destructive" : "",
            isFocused ? "border-primary/50" : ""
          )}
          aria-invalid={showError ? "true" : "false"}
        />
        
        {showError && (
          <div className="text-destructive text-xs mt-1 animate-slide-up">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;

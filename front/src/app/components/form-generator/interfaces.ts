export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'select' | 'textarea' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  options?: { value: string | number; label: string }[]; // For select fields
  validators?: any[]; // Custom validators
  initialValue?: any;
  prefixIcon?: string; // Material icon name for prefix
  suffixIcon?: string; // Material icon name for suffix
  showPasswordToggle?: boolean; // For password fields
}

export interface FormConfig {
  fields: FormFieldConfig[];
  submitButtonText?: string;
}

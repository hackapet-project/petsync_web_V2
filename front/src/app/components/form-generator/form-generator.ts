import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormConfig, FormFieldConfig } from './interfaces';

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatIconModule, MatButtonModule
  ],
  templateUrl: './form-generator.html',
  styleUrls: ['./form-generator.css']
})
export class FormGeneratorComponent implements OnInit {
  @Input() config!: FormConfig;
  @Output() formSubmit = new EventEmitter<any>();
  
  form!: FormGroup;
  passwordVisibility: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.initializePasswordVisibility();
  }

  private initializePasswordVisibility(): void {
    this.config.fields.forEach(field => {
      if (field.type === 'password' && field.showPasswordToggle) {
        this.passwordVisibility[field.name] = false;
      }
    });
  }

  togglePasswordVisibility(fieldName: string): void {
    this.passwordVisibility[fieldName] = !this.passwordVisibility[fieldName];
  }

  private buildForm(): void {
    const group: any = {};

    this.config.fields.forEach(field => {
      const validators = this.getValidators(field);
      group[field.name] = [field.initialValue || '', validators];
    });

    this.form = this.fb.group(group);
  }

  getInputType(field: FormFieldConfig): string {
    if (field.type === 'password' && field.showPasswordToggle) {
      return this.passwordVisibility[field.name] ? 'text' : 'password';
    }
    return field.type;
  }

  private getValidators(field: FormFieldConfig): any[] {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }
    if (field.type === 'email') {
      validators.push(Validators.email);
    }
    if (field.validators) {
      validators.push(...field.validators);
    }

    return validators;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'Este campo es requerido';
    }
    if (control.errors['email']) {
      return 'formato de email inválido';
    }
    if (control.errors['minlength']) {
      return `Debe tener ${control.errors['minlength'].requiredLength} carácteres mínimo`;
    }
    if (control.errors['maxlength']) {
      return `Debe tener ${control.errors['maxlength'].requiredLength} carácteres máximo`;
    }
    if (control.errors['pattern']) {
      return 'Formato inválido';
    }

    return 'Invalid field';
  }

  hasError(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!(control && control.errors && control.touched);
  }
}

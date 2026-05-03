import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormGeneratorComponent } from '@app/components/form-generator/form-generator';
import { FormConfig } from '@app/components/form-generator/interfaces';
import { finalize, isObservable, Observable } from 'rxjs';

export interface ModalData {
  title?: string;
  config?: FormConfig;
  submitAction?: (formValue: any) => Observable<unknown> | Promise<unknown> | unknown;
}

@Component({
  selector: 'app-modal',
  imports: [
    MatDialogModule, MatButtonModule, CommonModule,
  FormGeneratorComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  title: string;
  formConfig: FormConfig;
  submitting = false;
  errorMessage: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) private readonly data: ModalData | null,
  ) {
    this.title = data?.title ?? 'Nueva Adopción';
    this.formConfig = data?.config ?? { fields: [], submitButtonText: 'Guardar' };
  }
  
  onSubmit(formValue: any): void {
    this.errorMessage = null;

    if (!this.data?.submitAction) {
      this.dialogRef.close(formValue);
      return;
    }

    this.submitting = true;

    const result = this.data.submitAction(formValue);

    if (isObservable(result)) {
      result
        .pipe(finalize(() => { this.submitting = false; }))
        .subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            this.errorMessage = this.getErrorMessage(error);
          },
        });
      return;
    }

    if (result instanceof Promise) {
      result
        .then((response) => {
          this.dialogRef.close(response);
        })
        .catch((error) => {
          this.errorMessage = this.getErrorMessage(error);
        })
        .finally(() => {
          this.submitting = false;
        });
      return;
    }

    this.submitting = false;
    this.dialogRef.close(result);
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return this.stringifyApiError(error.error) || 'No se pudo guardar el formulario.';
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'No se pudo guardar el formulario.';
  }

  private stringifyApiError(payload: unknown): string {
    if (typeof payload === 'string') {
      return payload;
    }

    if (!payload || typeof payload !== 'object') {
      return '';
    }

    const entries = Object.entries(payload as Record<string, unknown>);
    const messages = entries.flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item) => `${key}: ${String(item)}`);
      }

      if (typeof value === 'string') {
        return [`${key}: ${value}`];
      }

      return [];
    });

    return messages.join(' ');
  }
}

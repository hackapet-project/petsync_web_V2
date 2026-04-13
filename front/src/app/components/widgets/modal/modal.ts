import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormGeneratorComponent } from '@app/components/form-generator/form-generator';
import { adoptionFormConfig } from '@app/components/form-generator/forms_scaffolders/adoption';
import { FormConfig } from '@app/components/form-generator/interfaces';
@Component({
  selector: 'app-modal',
  imports: [
    MatDialogModule, MatButtonModule, CommonModule,
  FormGeneratorComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  adoptionConfig: FormConfig = adoptionFormConfig;

  onSubmit(event: Event): void {
    console.log('HEY BRAH')
  }
}
import { Component } from '@angular/core';
import { FormGeneratorComponent } from '../../../components/form-generator/form-generator';
import { FormConfig } from '../../../components/form-generator/interfaces';
import { loginFormConfig } from '../../../components/form-generator/forms_scaffolders/login';

@Component({
  selector: 'app-dashboard',
  imports: [
    FormGeneratorComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  myFormConfig: FormConfig = loginFormConfig

  handleFormSubmission($event: Event) {
    console.log('Submited from custom form generator')
  }
}

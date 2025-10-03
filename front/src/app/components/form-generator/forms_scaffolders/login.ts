import { FormConfig } from "../interfaces";

export const loginFormConfig: FormConfig = {
  fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'tu.email@example.com',
        suffixIcon: 'email',
        required: true
      },
      {
        name: 'password',
        label: 'Contraseña',
        type: 'password',
        placeholder: 'Tu contraseña',
        showPasswordToggle: true,
        // suffixIcon: 'eye',
        required: true,
        minLength: 8
      }
    ],
    submitButtonText: 'Iniciar sesión'
}

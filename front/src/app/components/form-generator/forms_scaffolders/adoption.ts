import { UserListItem } from '@app/core/services/users/users.model';
import { AdoptionState } from '@app/core/services/adoptions/adoptions.model';
import { FormConfig } from "../interfaces";

export function buildAdoptionFormConfig(users: UserListItem[]): FormConfig {
  return {
    fields: [
      {
        name: 'adoptant',
        label: 'Usuario',
        type: 'select',
        required: true,
        options: users.map((user) => ({
          value: user.user_id,
          label: `${user.name} (${user.email})`,
        })),
      },
    ],
    submitButtonText: 'Crear adopcion'
  };
}

export function buildAdoptionStateFormConfig(initialState: AdoptionState): FormConfig {
  return {
    fields: [
      {
        name: 'state',
        label: 'Estado',
        type: 'select',
        required: true,
        initialValue: initialState,
        options: [
          { value: 'initiated', label: 'Iniciada' },
          { value: 'in_review', label: 'En revisión' },
          { value: 'approved', label: 'Aprobada' },
          { value: 'frozen', label: 'Pausada' },
          { value: 'completed', label: 'Completada' },
          { value: 'rejected', label: 'Rechazada' },
        ],
      },
    ],
    submitButtonText: 'Guardar estado',
  };
}

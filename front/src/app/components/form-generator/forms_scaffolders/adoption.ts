import { FormConfig } from "../interfaces";

export const adoptionFormConfig: FormConfig = {
  fields: [
      {
        name: 'animal_id',
        label: 'Animal ID',
        type: 'text',
        placeholder: 'ID50984X',
        suffixIcon: 'fingerprint',
        required: true
      },
      {
        name: 'responsable_id',
        label: 'Reponsable ID',
        type: 'text',
        placeholder: 'Tu ID',
        suffixIcon: 'id_card',
        required: true,
      },
      {
        name: 'adoptant_name',
        label: 'adoptant name',
        type: 'text',
        placeholder: 'Nombre del adoptante',
        // suffixIcon: 'id_card',
        required: true,
      },
      {
        name: 'adoptant_email',
        label: 'adoptant name',
        type: 'text',
        placeholder: 'Email del adoptante',
        suffixIcon: 'mail',
        required: true,
      },
      {
        name: 'animal_id',
        label: 'Animal ID',
        type: 'text',
        placeholder: 'ID50984X',
        suffixIcon: 'fingerprint',
        required: true
      },
      {
        name: 'responsable_id',
        label: 'Reponsable ID',
        type: 'text',
        placeholder: 'Tu ID',
        suffixIcon: 'id_card',
        required: true,
      },
      {
        name: 'adoptant_name',
        label: 'adoptant name',
        type: 'text',
        placeholder: 'Nombre del adoptante',
        // suffixIcon: 'id_card',
        required: true,
      },
      {
        name: 'adoptant_email',
        label: 'adoptant name',
        type: 'text',
        placeholder: 'Email del adoptante',
        suffixIcon: 'mail',
        required: true,
      },
    ],
    submitButtonText: 'Crear adopcion'
}

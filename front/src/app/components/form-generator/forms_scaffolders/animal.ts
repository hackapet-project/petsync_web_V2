import { Animal, CreateAnimalDto } from '@app/core/services/animals/animals.model';
import { FormConfig, FormFieldConfig } from '../interfaces';

const animalFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Luna',
    suffixIcon: 'pets',
    required: true,
  },
  {
    name: 'species',
    label: 'Especie',
    type: 'select',
    required: true,
    options: [
      { value: 'dog', label: 'Perro' },
      { value: 'cat', label: 'Gato' },
      { value: 'other', label: 'Otro' },
    ],
  },
  {
    name: 'breed',
    label: 'Raza',
    type: 'text',
    placeholder: 'Mestizo',
    required: true,
  },
  {
    name: 'gender',
    label: 'Sexo',
    type: 'select',
    required: true,
    options: [
      { value: 'male', label: 'Macho' },
      { value: 'female', label: 'Hembra' },
      { value: 'unknown', label: 'Desconocido' },
    ],
  },
  {
    name: 'status',
    label: 'Estado',
    type: 'select',
    required: true,
    initialValue: 'rescued',
    options: [
      { value: 'rescued', label: 'Rescatado / Admitido' },
      { value: 'quarantine', label: 'Cuarentena' },
      { value: 'shelter', label: 'En refugio' },
      { value: 'foster', label: 'Acogida' },
      { value: 'treatment', label: 'Tratamiento veterinario' },
      { value: 'rehabilitation', label: 'Rehabilitación' },
      { value: 'reserved', label: 'Reservado' },
      { value: 'adopted', label: 'Adoptado' },
      { value: 'returned', label: 'Devuelto' },
      { value: 'transport', label: 'En traslado' },
      { value: 'lost', label: 'Perdido' },
      { value: 'deceased', label: 'Fallecido' },
      { value: 'euthanized', label: 'Eutanasiado' },
      { value: 'pre_intake', label: 'Pendiente de ingreso' },
      { value: 'transferred', label: 'Transferido' },
      { value: 'trial_adoption', label: 'Adopción de prueba' },
    ],
  },
  {
    name: 'chip',
    label: 'Chip',
    type: 'text',
    placeholder: '981000000000000',
    required: true,
  },
  {
    name: 'intake_date',
    label: 'Fecha de ingreso',
    type: 'date',
    required: true,
  },
  {
    name: 'birth_date',
    label: 'Fecha de nacimiento',
    type: 'date',
  },
  {
    name: 'size',
    label: 'Tamaño',
    type: 'select',
    options: [
      { value: 'small', label: 'Pequeño' },
      { value: 'medium', label: 'Mediano' },
      { value: 'large', label: 'Grande' },
    ],
  },
  {
    name: 'weight',
    label: 'Peso (kg)',
    type: 'number',
    placeholder: '12.5',
  },
  {
    name: 'last_vet_visit',
    label: 'Última visita veterinaria',
    type: 'date',
  },
  {
    name: 'temperament',
    label: 'Temperamento',
    type: 'text',
    placeholder: 'Sociable y tranquilo',
  },
  {
    name: 'medical_notes',
    label: 'Notas médicas',
    type: 'textarea',
    placeholder: 'Información veterinaria relevante',
  },
  {
    name: 'allergies',
    label: 'Alergias',
    type: 'textarea',
    placeholder: 'Sin alergias conocidas',
  },
  {
    name: 'behavior_notes',
    label: 'Notas de comportamiento',
    type: 'textarea',
    placeholder: 'Convivencia, miedos, rutina...',
  },
  {
    name: 'microchipped',
    label: 'Microchipado',
    type: 'checkbox',
  },
  {
    name: 'sterilized',
    label: 'Esterilizado',
    type: 'checkbox',
  },
  {
    name: 'vaccinated',
    label: 'Vacunado',
    type: 'checkbox',
  },
];

export const animalFormConfig: FormConfig = {
  fields: animalFields.map((field) => ({ ...field })),
  submitButtonText: 'Crear animal',
};

export function buildAnimalFormConfig(animal: Animal, submitButtonText = 'Guardar cambios'): FormConfig {
  const initialValues: Partial<Omit<CreateAnimalDto, 'shelter'>> = {
    status: animal.state,
    name: animal.name,
    breed: animal.breed,
    chip: animal.chip,
    birth_date: animal.birthDate,
    intake_date: animal.intakeDate,
    outcome_date: animal.outcomeDate,
    species: animal.species,
    gender: animal.gender,
    size: animal.size,
    weight: animal.weightValue,
    microchipped: animal.microchipped,
    sterilized: animal.sterilized,
    vaccinated: animal.vaccinated,
    medical_notes: animal.medicalNotes,
    allergies: animal.allergies,
    last_vet_visit: animal.lastVetVisit,
    temperament: animal.temperament,
    behavior_notes: animal.behaviorNotes,
  };

  return {
    fields: animalFields.map((field) => ({
      ...field,
      initialValue: initialValues[field.name as keyof typeof initialValues] ?? field.initialValue,
    })),
    submitButtonText,
  };
}

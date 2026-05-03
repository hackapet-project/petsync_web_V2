export interface AnimalApiResponse {
  id: string;
  shelter_id: string;
  status: string;
  name: string;
  breed: string;
  chip: string;
  birth_date: string | null;
  intake_date: string;
  outcome_date: string | null;
  species: string;
  gender: string;
  size: string;
  weight: string | number | null;
  microchipped: boolean;
  sterilized: boolean;
  vaccinated: boolean;
  medical_notes: string;
  allergies: string;
  last_vet_visit: string | null;
  temperament: string;
  behavior_notes: string;
  created_at: string;
  updated_at: string;
}

export interface Animal {
  id: string;
  shelterId: string;
  state: string;
  name: string;
  species: string;
  breed: string;
  gender: string;
  size: string;
  weight: string;
  weightValue: number | null;
  age: string;
  chip: string;
  birthDate: string | null;
  intakeDate: string;
  outcomeDate: string | null;
  microchipped: boolean;
  sterilized: boolean;
  vaccinated: boolean;
  medicalNotes: string;
  allergies: string;
  lastVetVisit: string | null;
  temperament: string;
  behaviorNotes: string;
}

export interface CreateAnimalDto {
  shelter: string;
  status: string;
  name: string;
  breed: string;
  chip: string;
  birth_date?: string | null;
  intake_date: string;
  outcome_date?: string | null;
  species: string;
  gender: string;
  size?: string;
  weight?: number | null;
  microchipped?: boolean;
  sterilized?: boolean;
  vaccinated?: boolean;
  medical_notes?: string;
  allergies?: string;
  last_vet_visit?: string | null;
  temperament?: string;
  behavior_notes?: string;
}

export type UpdateAnimalDto = Partial<CreateAnimalDto>;

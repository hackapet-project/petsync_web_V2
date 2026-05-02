export type AdoptionState =
  | 'initiated'
  | 'in_review'
  | 'approved'
  | 'frozen'
  | 'completed'
  | 'rejected';

export interface Adoption {
  adoption_id: string;        // UUID
  animal: number;
  responsable_id: string;   // ULID — matches User.user_id
  adoptant_name: string;
  adoptant_email: string;
  state: AdoptionState;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAdoptionDto {
  animal: number;
  responsable: number;
  adoptant_name: string;
  adoptant_email: string;
}

export interface UpdateAdoptionStateDto {
  state: AdoptionState;
  notes?: string;
}
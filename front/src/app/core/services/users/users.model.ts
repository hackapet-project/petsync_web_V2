export interface UserListItem {
  user_id: string;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  shelter: string | null;
  shelter_name?: string | null;
}

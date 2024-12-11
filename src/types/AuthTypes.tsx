export interface User {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  campus_id?: number;
  supervisor: boolean;
  student: boolean;
}

export type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
  logout: () => void;
};

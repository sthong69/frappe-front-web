export interface User {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  campus_id: number;
  supervisor: boolean;
  student: boolean;
}

export type AuthContextType = {
  user: User | null;
  login: (input: { email: string; password: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoaded: boolean;
};

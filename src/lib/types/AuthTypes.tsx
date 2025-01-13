export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  campusId?: number;
  supervisor: boolean;
  student: boolean;
}

export interface Student extends User {
  student: true;
  supervisor: false;
  gender?: string;
  nationality?: string;
  creditTransferId?: number;
}

export type AuthContextType = {
  token: string | null;
  student: Student | null;
  isAuthenticated: () => Promise<boolean>;
  setAuthToken: (token: string) => void;
  removeAuthToken: () => void;
  logout: () => void;
  isProfileComplete: () => boolean;
};

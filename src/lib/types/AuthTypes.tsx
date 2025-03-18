export interface UserBase {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  campusId?: number;
}

export interface Student extends UserBase {
  gender?: string;
  nationality?: string;
  creditTransferId?: number;
}

export interface Supervisor extends UserBase {
  meetingUrl?: string;
}

export type User = Student | Supervisor;

export type AuthContextType = {
  authToken: string | undefined;
  user: User | undefined;
  userRole: string | undefined;
  storeAuthToken: (token: string) => void;
  storeUserRole: (role: string) => void;
  logout: () => void;
  isAuthenticated: () => Promise<boolean>;
  isProfileComplete: () => boolean;
  fetchUserInfo: () => Promise<boolean>;
};

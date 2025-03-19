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
  campusId: number;
}

export interface SupervisorAsStudent {
  id: number;
  firstName: string;
  lastName: string;
  campusId: number;
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

export type RegisterResponse = string;

export interface RegisterInput {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export type VerifyResponse = string;

export interface VerifyInput {
  token: string;
}

export interface LoginResponse {
  token: string;
  role: "ROLE_STUDENT" | "ROLE_SUPERVISOR";
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface GetSupervisorInfoInput {
  supervisorId: number;
}

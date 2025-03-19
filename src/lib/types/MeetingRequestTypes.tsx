import { Student, Supervisor } from "./AuthTypes";

export interface MeetingRequest {
  id: number;
  startDate: Date;
  endDate: Date;
  theme: string;
  location: string;
  requestDescription: string;
  status: string;
  student: Student;
  supervisor: Supervisor;
}

export interface MeetingAction {
  id: number;
  notes: string;
  actionPlan: string;
}

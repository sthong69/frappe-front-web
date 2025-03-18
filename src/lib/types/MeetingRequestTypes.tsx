import { Student, Supervisor } from "./AuthTypes";

export interface MeetingRequest {
  startDate: Date;
  endDate: Date;
  theme: string;
  location: string;
  requestDescription: string;
  status: string;
  student: Student;
  supervisor: Supervisor;
}

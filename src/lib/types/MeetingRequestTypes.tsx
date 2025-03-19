import { Student, Supervisor, SupervisorAsStudent } from "./AuthTypes";
import { Campus } from "./CampusTypes";

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

export interface MeetingRequestInput {
  startDate: Date | undefined;
  endDate: Date | undefined;
  theme: string | undefined;
  location: string;
  requestDescription: string | undefined;
  studentId: number | undefined;
  supervisorInfos: SupervisorAsStudent;
  campusInfos: Campus;
  internshipDuration: string | undefined;
  wantedCountry: string | undefined;
}

export interface MeetingRequestResponse {
  id: number;
  startDate: string;
  endDate: string;
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

export interface GetMeetingInfoPerIdInput {
  meetingId: number;
}

export interface GetMeetingActionInput {
  meetingId: number;
}

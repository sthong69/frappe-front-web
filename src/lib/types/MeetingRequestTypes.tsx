import { Student, Supervisor } from "./AuthTypes";
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

export interface MeetingRequestInput extends MeetingRequest {
  studentId: number;
  supervisorInfos: Supervisor;
  campusInfos: Campus;
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

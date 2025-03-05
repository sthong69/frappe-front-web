export interface MeetingRequest {
  startDate: Date;
  endDate: Date;
  theme: string;
  location: string;
  requestDescription: string;
  status: string;
  studentId: number;
  supervisorId: number;
}

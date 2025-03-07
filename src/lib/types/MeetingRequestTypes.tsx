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

export interface MeetingRequestWithNames extends MeetingRequest {
  studentFirstName: string;
  studentLastName: string;
  supervisorFirstName: string;
  supervisorLastName: string;
}

import { MeetingAction, MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import secureAPI from "./axios";
import { parseJSON } from "date-fns";
import { Student, Supervisor } from "@/lib/types/AuthTypes";

export const getSupervisorMeetingRequests = async (): Promise<
  MeetingRequest[]
> => {
  return secureAPI
    .get("/supervisors/me/meeting-requests")
    .then(function (response) {
      return Promise.resolve(
        response.data.map(
          (meetingRequest: {
            id: number;
            startDate: string;
            endDate: string;
            theme: string;
            location: string;
            requestDescription: string;
            status: string;
            student: Student;
            supervisor: Supervisor;
          }) => ({
            ...meetingRequest,
            startDate: parseJSON(meetingRequest.startDate),
            endDate: parseJSON(meetingRequest.endDate),
          }),
        ),
      );
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

export const getStudentMeetingRequests = async (): Promise<
  MeetingRequest[]
> => {
  return secureAPI
    .get("/students/me/meeting-requests")
    .then(function (response) {
      return Promise.resolve(
        response.data.map(
          (meetingRequest: {
            id: number;
            startDate: string;
            endDate: string;
            theme: string;
            location: string;
            requestDescription: string;
            status: string;
            student: Student;
            supervisor: Supervisor;
          }) => ({
            ...meetingRequest,
            startDate: parseJSON(meetingRequest.startDate),
            endDate: parseJSON(meetingRequest.endDate),
          }),
        ),
      );
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

export const requestAMeeting = async (meetingInfos: {
  campusInfos: { id: number; name: string };
  supervisorInfos: { id: number; firstName: string; lastName: string };
  studentId: number;
  startDate: Date;
  endDate: Date;
  theme: string;
  request_description: string;
  internship_duration: string | undefined;
  wanted_country: string | undefined;
  duration: string;
}): Promise<MeetingRequest> => {
  return secureAPI
    .post("/meeting-requests", {
      supervisorId: meetingInfos.supervisorInfos.id,
      studentId: meetingInfos.studentId,
      startDate: meetingInfos.startDate,
      endDate: meetingInfos.endDate,
      theme: meetingInfos.theme,
      requestDescription: meetingInfos.request_description,
      status: "pending",
      location: meetingInfos.campusInfos.name,
    })
    .then(function (response) {
      return Promise.resolve({
        ...response.data,
        startDate: parseJSON(response.data.startDate),
        endDate: parseJSON(response.data.endDate),
      });
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

export const getMeetingInfoPerIdAsStudent = async (
  meetingRequestId: number,
): Promise<MeetingRequest> => {
  return secureAPI
    .get(`/students/me/meeting-requests`)
    .then(function (response) {
      const meetingRequest = response.data.find(
        (meetingRequest: MeetingRequest) =>
          meetingRequest.id === meetingRequestId,
      );
      if (meetingRequest) {
        return Promise.resolve({
          ...meetingRequest,
          startDate: parseJSON(meetingRequest.startDate),
          endDate: parseJSON(meetingRequest.endDate),
        });
      }
      return Promise.reject("Meeting request not found");
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export const getMeetingInfoPerIdAsSupervisor = async (
  meetingRequestId: number,
): Promise<MeetingRequest> => {
  return secureAPI
    .get("/supervisors/me/meeting-requests")
    .then(function (response) {
      const meetingRequest = response.data.find(
        (meetingRequest: MeetingRequest) =>
          meetingRequest.id === meetingRequestId,
      );
      if (meetingRequest) {
        return Promise.resolve({
          ...meetingRequest,
          startDate: parseJSON(meetingRequest.startDate),
          endDate: parseJSON(meetingRequest.endDate),
        });
      }
      return Promise.reject("Meeting request not found");
    });
};

export const getMeetingAction = async (
  meetingId: number,
): Promise<MeetingAction> => {
  return secureAPI
    .get(`/meeting-requests/${meetingId}/actions`)
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export const addMeetingAction = async (
  meetingId: number,
  actionInfos: {
    notes: string;
    actionPlan: string;
  },
): Promise<MeetingAction> => {
  return secureAPI
    .post(`/meeting-requests/${meetingId}/actions`, {
      notes: actionInfos.notes,
      actionPlan: actionInfos.actionPlan,
    })
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

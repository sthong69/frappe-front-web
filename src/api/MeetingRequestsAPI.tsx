import {
  GetMeetingActionInput,
  GetMeetingInfoPerIdInput,
  MeetingAction,
  MeetingRequest,
  MeetingRequestInput,
  MeetingRequestResponse,
} from "@/lib/types/MeetingRequestTypes";
import secureAPI from "./axios";
import { parseJSON } from "date-fns";
import { AxiosError, AxiosResponse } from "axios";

export const getSupervisorMeetingRequests = async (): Promise<
  MeetingRequest[]
> => {
  return secureAPI
    .get("/supervisors/me/meeting-requests")
    .then(function (response: AxiosResponse<MeetingRequestResponse[]>) {
      return Promise.resolve(
        response.data.map((meetingRequest: MeetingRequestResponse) => ({
          ...meetingRequest,
          startDate: parseJSON(meetingRequest.startDate),
          endDate: parseJSON(meetingRequest.endDate),
        })),
      );
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getStudentMeetingRequests = async (): Promise<
  MeetingRequest[]
> => {
  return secureAPI
    .get("/students/me/meeting-requests")
    .then(function (response: AxiosResponse<MeetingRequestResponse[]>) {
      return Promise.resolve(
        response.data.map((meetingRequest: MeetingRequestResponse) => ({
          ...meetingRequest,
          startDate: parseJSON(meetingRequest.startDate),
          endDate: parseJSON(meetingRequest.endDate),
        })),
      );
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const requestAMeeting = async (
  meetingInfos: MeetingRequestInput,
): Promise<MeetingRequest> => {
  return secureAPI
    .post("/meeting-requests", {
      supervisorId: meetingInfos.supervisorInfos.id,
      studentId: meetingInfos.studentId,
      startDate: meetingInfos.startDate,
      endDate: meetingInfos.endDate,
      theme: meetingInfos.theme,
      requestDescription: meetingInfos.requestDescription,
      status: "pending",
      location: meetingInfos.campusInfos.name,
    })
    .then(function (response: AxiosResponse<MeetingRequestResponse>) {
      return Promise.resolve({
        ...response.data,
        startDate: parseJSON(response.data.startDate),
        endDate: parseJSON(response.data.endDate),
      });
    })
    .catch(function (error: AxiosError) {
      console.log(error);
      return Promise.reject(error);
    });
};

export const getMeetingInfoPerIdAsStudent = async (
  input: GetMeetingInfoPerIdInput,
): Promise<MeetingRequest> => {
  return secureAPI
    .get(`/students/me/meeting-requests`)
    .then(function (response: AxiosResponse<MeetingRequestResponse[]>) {
      const meetingRequest = response.data.find(
        (meetingRequest: MeetingRequestResponse) =>
          meetingRequest.id === input.meetingId,
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
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getMeetingInfoPerIdAsSupervisor = async (
  input: GetMeetingInfoPerIdInput,
): Promise<MeetingRequest> => {
  return secureAPI
    .get("/supervisors/me/meeting-requests")
    .then(function (response: AxiosResponse<MeetingRequestResponse[]>) {
      const meetingRequest = response.data.find(
        (meetingRequest: MeetingRequestResponse) =>
          meetingRequest.id === input.meetingId,
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
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getMeetingAction = async (
  input: GetMeetingActionInput,
): Promise<MeetingAction> => {
  return secureAPI
    .get(`/meeting-requests/${input.meetingId}/actions`)
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

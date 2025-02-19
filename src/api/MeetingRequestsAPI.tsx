import secureAPI from "./axios";

export const getSupervisorMeetingRequests = async (): Promise<
  {
    startDate: string;
    endDate: string;
    theme: string;
    location: string;
    requestDescription: string;
    status: string;
    studentId: number;
    supervisorId: number;
  }[]
> => {
  return secureAPI
    .get("/supervisors/me/meeting-requests")
    .then(function (response) {
      return Promise.resolve(response.data);
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
}): Promise<{
  startDate: string;
  endDate: string;
  theme: string;
  location: string;
  requestDescription: string;
  status: string;
  studentId: number;
  supervisorId: number;
}> => {
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
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

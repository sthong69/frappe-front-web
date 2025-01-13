import { publicAPI } from "./axios";

export const getAllSupervisors = async (): Promise<
  {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    campusId: number;
    meetingUrl: string;
  }[]
> => {
  return publicAPI
    .get("/supervisors/")
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

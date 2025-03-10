import { Supervisor } from "@/lib/types/AuthTypes";
import secureAPI, { publicAPI } from "./axios";

export const fetchSupervisorInfo = async (): Promise<Supervisor> => {
  return secureAPI
    .get("/supervisors/me")
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

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
    .get("/supervisors")
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export const getSupervisorInfoFromId = async (
  supervisorId: number,
): Promise<Supervisor> => {
  return secureAPI
    .get(`/supervisors/${supervisorId}`)
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

export const createSupervisor = async ({
  username,
  email,
  password,
  firstName,
  lastName,
  campusId,
  meetingUrl,
  caldavUsername,
  caldavPassword,
}: {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  campusId: number;
  meetingUrl: string;
  caldavUsername: string;
  caldavPassword: string;
}): Promise<Supervisor> => {
  return secureAPI
    .post("/supervisors", {
      username,
      email,
      password,
      firstName,
      lastName,
      campusId,
      meetingUrl,
      caldavUsername,
      caldavPassword,
    })
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

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
  campusId,
  firstName,
  lastName,
}: {
  username: string;
  email: string;
  password: string;
  campusId: number;
  firstName: string;
  lastName: string;
}): Promise<Supervisor> => {
  return secureAPI
    .post("/supervisors", {
      username,
      email,
      password,
      campusId,
      firstName,
      lastName,
    })
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

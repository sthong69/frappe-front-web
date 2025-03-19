import {
  GetSupervisorInfoInput,
  Supervisor,
  SupervisorAsStudent,
} from "@/lib/types/AuthTypes";
import secureAPI from "./axios";
import { Axios, AxiosAdapter, AxiosError, AxiosResponse } from "axios";

export const fetchSupervisorInfo = async (): Promise<Supervisor> => {
  return secureAPI
    .get("/supervisors/me")
    .then(function (response: AxiosResponse<Supervisor>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getAllSupervisorsAsSupervisor = async (): Promise<
  Supervisor[]
> => {
  return secureAPI
    .get("/supervisors")
    .then(function (response: AxiosResponse<Supervisor[]>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getAllSupervisorsAsStudent = async (): Promise<
  SupervisorAsStudent[]
> => {
  return secureAPI
    .get("/supervisors")
    .then(function (response: AxiosResponse<SupervisorAsStudent[]>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getSupervisorInfoFromId = async (
  input: GetSupervisorInfoInput,
): Promise<Supervisor> => {
  return secureAPI
    .get(`/supervisors/${input.supervisorId}`)
    .then(function (response: AxiosResponse<Supervisor>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const createSupervisor = async (
  supervisor: Supervisor,
): Promise<Supervisor> => {
  return secureAPI
    .post("/supervisors", supervisor)
    .then(function (response: AxiosResponse<Supervisor>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const updateSupervisorInfo = async (
  supervisor: Supervisor,
): Promise<Supervisor> => {
  return secureAPI
    .patch("/supervisors/me", supervisor)
    .then(function (response: AxiosResponse<Supervisor>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

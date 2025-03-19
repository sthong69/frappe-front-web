import { Campus, GetCampusInput } from "@/lib/types/CampusTypes";
import secureAPI from "./axios";
import { AxiosError, AxiosResponse } from "axios";

export const getAllCampuses = async (): Promise<Campus[]> => {
  return secureAPI
    .get("/campuses")
    .then(function (response: AxiosResponse<Campus[]>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getCampus = async (input: GetCampusInput): Promise<Campus> => {
  return secureAPI
    .get("/campuses/" + input.id)
    .then(function (response: AxiosResponse<Campus>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

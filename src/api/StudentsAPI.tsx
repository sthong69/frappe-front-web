import { Student } from "@/lib/types/AuthTypes";
import secureAPI from "./axios";
import { AxiosError, AxiosResponse } from "axios";

export const fetchStudentInfo = async (): Promise<Student> => {
  return secureAPI
    .get("/students/me")
    .then(function (response: AxiosResponse<Student>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const updateStudentInfo = async (student: Student): Promise<Student> => {
  return secureAPI
    .patch("/students/me", student)
    .then(function (response: AxiosResponse<Student>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getStudentInfoFromId = async (
  studentId: number,
): Promise<Student> => {
  return secureAPI
    .get(`/students/${studentId}`)
    .then(function (response: AxiosResponse<Student>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getStudentsList = async (): Promise<Student[]> => {
  return secureAPI
    .get("/students")
    .then(function (response: AxiosResponse<Student[]>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

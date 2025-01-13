import { Student } from "@/lib/types/AuthTypes";
import { secureAPI } from "./axios";

export const fetchStudentInfo = async (): Promise<Student> => {
  return secureAPI
    .get("/students/me")
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

export const updateStudentInfo = async (student: Student): Promise<Student> => {
  return secureAPI
    .patch("/students/me", student)
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

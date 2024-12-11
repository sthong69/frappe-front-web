import { User } from "@/types/AuthTypes";
import { axiosInstance } from "./axios";

export const getStudentInfo = async (token: string): Promise<User> => {
  return axiosInstance
    .get("/students/me", {
      headers: {
        Token: token,
      },
    })
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

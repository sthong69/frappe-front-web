import { axiosInstance } from "./axios";

export const register = async (input: {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}): Promise<void> => {
  return axiosInstance
    .post("/auth/register/", {
      username: input.username,
      password: input.password,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

export const login = async (input: {
  email: string;
  password: string;
}): Promise<void> => {
  return axiosInstance
    .post("/auth/login/", {
      email: input.email,
      password: input.password,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
};

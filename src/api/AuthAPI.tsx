import { publicAPI } from "./axios";

export const register = async (input: {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}): Promise<{ success: boolean; message: string }> => {
  return publicAPI
    .post("/auth/register", {
      username: input.username,
      password: input.password,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
    })
    .then(function (response) {
      if (!response.data.success) {
        return Promise.reject(response.data.message);
      } else {
        return Promise.resolve(response.data);
      }
    })
    .catch(function (error) {
      return Promise.reject(error.response.data.message);
    });
};

export const verify = async (input: {
  token: string;
}): Promise<{ success: boolean; message: string }> => {
  return publicAPI
    .post("/auth/verify", {
      token: input.token,
    })
    .then(function (response) {
      if (!response.data.success) {
        return Promise.reject(response.data.message);
      } else {
        return Promise.resolve(response.data);
      }
    })
    .catch(function (error) {
      return Promise.reject(error.response.data.message);
    });
};

export const login = async (input: {
  email: string;
  password: string;
}): Promise<{ token: string; message: string }> => {
  return publicAPI
    .post("/auth/login", {
      email: input.email,
      password: input.password,
    })
    .then(function (response) {
      if (!response.data.token) {
        return Promise.reject(response.data.message);
      }
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

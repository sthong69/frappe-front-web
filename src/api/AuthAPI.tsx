import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
  VerifyInput,
  VerifyResponse,
} from "@/lib/types/AuthTypes";
import { publicAPI } from "./axios";
import { AxiosError, AxiosResponse } from "axios";

export const register = async (
  input: RegisterInput,
): Promise<RegisterResponse> => {
  return publicAPI
    .post("/auth/register", {
      username: input.username,
      password: input.password,
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
    })
    .then(function (response: AxiosResponse<RegisterResponse>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const verify = async (input: VerifyInput): Promise<VerifyResponse> => {
  return publicAPI
    .post("/auth/verify", {
      token: input.token,
    })
    .then(function (response: AxiosResponse<VerifyResponse>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const login = async (input: LoginInput): Promise<LoginResponse> => {
  return publicAPI
    .post("/auth/login", {
      email: input.email,
      password: input.password,
    })
    .then(function (response: AxiosResponse<LoginResponse>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

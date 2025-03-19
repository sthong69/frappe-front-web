import {
  CreditTransfer,
  GetCreditTransfersInput,
} from "@/lib/types/CreditTransfersTypes";
import secureAPI from "./axios";
import { AxiosError, AxiosResponse } from "axios";

export const getAllCreditTransfers = async (): Promise<CreditTransfer[]> => {
  return secureAPI
    .get("/credit-transfers")
    .then(function (response: AxiosResponse<CreditTransfer[]>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getCreditTransfer = async (
  input: GetCreditTransfersInput,
): Promise<CreditTransfer> => {
  return secureAPI
    .get("/credit-transfers/" + input.id)
    .then(function (response: AxiosResponse<CreditTransfer>) {
      return Promise.resolve(response.data);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

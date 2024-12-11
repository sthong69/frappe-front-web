import { axiosInstance } from "./axios";

export const getAllCreditTransfers = async (): Promise<
  {
    id: number;
    university: string;
    country: string;
    startDate: string;
    endDate: string;
  }[]
> => {
  return axiosInstance
    .get("/credit-transfers/")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

export const getCreditTransfer = async (
  id: number,
): Promise<{
  id: number;
  university: string;
  country: string;
  startDate: string;
  endDate: string;
}> => {
  return axiosInstance
    .get("/credit-transfers/" + id + "/")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

import { publicAPI } from "./axios";

export const getAllCreditTransfers = async (): Promise<
  {
    id: number;
    university: string;
    country: string;
    startDate: string;
    endDate: string;
  }[]
> => {
  return publicAPI
    .get("/credit-transfers/")
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
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
  return publicAPI
    .get("/credit-transfers/" + id + "/")
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

import { axiosInstance } from "./axios";

export const getAllCampuses = async (): Promise<
  {
    id: number;
    name: string;
  }[]
> => {
  return axiosInstance
    .get("/campuses/")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

export const getCampus = async (
  id: number,
): Promise<{
  id: number;
  name: string;
}> => {
  return axiosInstance
    .get("/campuses/" + id + "/")
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      throw error;
    });
};

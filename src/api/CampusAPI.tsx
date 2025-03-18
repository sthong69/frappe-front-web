import secureAPI from "./axios";

export const getAllCampuses = async (): Promise<
  {
    id: number;
    name: string;
  }[]
> => {
  return secureAPI
    .get("/campuses")
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export const getCampus = async (
  id: number,
): Promise<{
  id: number;
  name: string;
}> => {
  return secureAPI
    .get("/campuses/" + id)
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

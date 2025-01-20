import axios from "axios";

export const getAllCitiesPerCountryName = async (
  country_name: string,
): Promise<string[]> => {
  return axios
    .post<{ error: string; msg: string; data: string[] }>(
      "https://countriesnow.space/api/v0.1/countries/cities",
      { country: country_name },
      { maxBodyLength: Infinity },
    )
    .then(function (response) {
      return Promise.resolve(response.data.data);
    })
    .catch(function (error: any) {
      return Promise.reject(error);
    });
};

import secureAPI from "./axios";

export const getAllMeetingRequests = async (): Promise<any> => {
  return secureAPI
    .get("/supervisors/me/meeting-requests")
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return Promise.reject(error);
    });
};

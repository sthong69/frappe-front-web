import { publicAPI } from "./axios";
import {
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  getYear,
  getMonth,
  getDate,
} from "date-fns";

export const getAvailableDays = async (meetingInfos: {
  supervisorId: number;
  duration: string;
}): Promise<Date[]> => {
  return publicAPI
    .get(`/availabilities/${meetingInfos.supervisorId}/days`, {
      params: {
        duration: meetingInfos.duration,
      },
    })
    .then(function (response: { data: string[] }) {
      let parsedData = response.data.map((item) => {
        let parsedDate = new Date(item);
        return setHours(setMinutes(parsedDate, 0), 0);
      });
      return Promise.resolve(parsedData);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export const getAvailableSlots = async (meetingInfos: {
  supervisorId: number;
  day: Date;
  duration: string;
}): Promise<
  {
    startHours: number;
    startMinutes: number;
  }[]
> => {
  let parsedDate = new Date(meetingInfos.day);
  let formattedDate = `${getYear(parsedDate)}-${getMonth(parsedDate) + 1}-${getDate(parsedDate)}`;
  return publicAPI
    .get(`/availabilities/${meetingInfos.supervisorId}/slots`, {
      params: {
        date: formattedDate,
        duration: meetingInfos.duration,
      },
    })
    .then(function (response: {
      data: { start: string; end: string; duration: string; remote: boolean }[];
    }) {
      console.log(response.data);
      let parsedData = response.data.map((item) => ({
        startHours: getHours(new Date(item.start)),
        startMinutes: getMinutes(new Date(item.start)),
      }));
      return Promise.resolve(parsedData);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

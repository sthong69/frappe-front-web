import { publicAPI } from "./axios";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns";

export const getAvailableDays = async (meetingInfos: {
  supervisorId: number;
  duration: string;
}): Promise<Date[]> => {
  return publicAPI
    .get("/availabilities", {
      params: {
        supervisorid: meetingInfos.supervisorId,
        duration: meetingInfos.duration,
      },
    })
    .then(function (response: {
      data: { start: string; end: string; duration: string }[];
    }) {
      let parsedData = response.data.map((item) => {
        const date = setHours(setMinutes(new Date(item.start), 0), 0);
        return date;
      });
      return Promise.resolve(parsedData);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

export const getAvailableHours = async (meetingInfos: {
  supervisorId: number;
  day: Date;
  duration: string;
}): Promise<
  {
    hours: number;
    minutes: number;
    duration: string;
  }[]
> => {
  let parsedDate = new Date(meetingInfos.day);
  console.log(parsedDate);
  let formattedDate = `${parsedDate.getFullYear()}-${parsedDate.getMonth() + 1}-${parsedDate.getDate()}`;
  console.log(formattedDate);
  return publicAPI
    .get("/dailyavailabilities", {
      params: {
        supervisorid: meetingInfos.supervisorId,
        date: formattedDate,
        duration: meetingInfos.duration,
      },
    })
    .then(function (response: {
      data: { start: string; end: string; duration: string }[];
    }) {
      console.log(response.data);
      let parsedData = response.data.map((item) => ({
        hours: getHours(new Date(item.start)),
        minutes: getMinutes(new Date(item.start)),
        duration: item.duration,
      }));
      return Promise.resolve(parsedData);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

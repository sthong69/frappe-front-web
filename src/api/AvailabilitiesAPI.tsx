import { publicAPI } from "./axios";
import {
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  getYear,
  getMonth,
  getDate,
  parseJSON,
  parseISO,
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
    endHours: number;
    endMinutes: number;
  }[]
> => {
  let parsedDate = new Date(meetingInfos.day);
  let formattedMonth = (getMonth(parsedDate) + 1).toString().padStart(2, "0");
  let formattedDay = getDate(parsedDate).toString().padStart(2, "0");
  let formattedDate = `${getYear(parsedDate)}-${formattedMonth}-${formattedDay}`;
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
      let parsedData = response.data.map((item) => ({
        startHours: parseJSON(item.start).getUTCHours(),
        startMinutes: getMinutes(parseJSON(item.start)),
        endHours: parseISO(item.end).getUTCHours(),
        endMinutes: getMinutes(parseJSON(item.end)),
      }));
      return Promise.resolve(parsedData);
    })
    .catch(function (error) {
      return Promise.reject(error);
    });
};

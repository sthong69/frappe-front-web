import {
  AvailableDay,
  AvailableDaysResponse,
  AvailableSlot,
  AvailableSlotsResponse,
  MeetingInfosWithDateSearchRange,
  MeetingInfosWithWantedDay,
} from "@/lib/types/AvailabilitiesTypes";
import secureAPI from "./axios";
import {
  getMinutes,
  setHours,
  setMinutes,
  getYear,
  getMonth,
  getDate,
  parseJSON,
  parseISO,
  getHours,
} from "date-fns";
import { AxiosError, AxiosResponse } from "axios";

export const getAvailableDays = async (
  meetingInfos: MeetingInfosWithDateSearchRange,
): Promise<AvailableDay[]> => {
  return secureAPI
    .get(`/availabilities/${meetingInfos.supervisorId}/days`, {
      params: {
        duration: meetingInfos.duration,
        startDate: meetingInfos.startDate.toISOString().split("T")[0],
        endDate: meetingInfos.endDate.toISOString().split("T")[0],
      },
    })
    .then(function (response: AxiosResponse<AvailableDaysResponse>) {
      let parsedData = response.data.map((item) => {
        let parsedDate = new Date(item);
        return setHours(setMinutes(parsedDate, 0), 0);
      });
      return Promise.resolve(parsedData);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

export const getAvailableSlots = async (
  meetingInfos: MeetingInfosWithWantedDay,
): Promise<AvailableSlot[]> => {
  let parsedDate = new Date(meetingInfos.day);
  let formattedMonth = (getMonth(parsedDate) + 1).toString().padStart(2, "0");
  let formattedDay = getDate(parsedDate).toString().padStart(2, "0");
  let formattedDate = `${getYear(parsedDate)}-${formattedMonth}-${formattedDay}`;
  return secureAPI
    .get(`/availabilities/${meetingInfos.supervisorId}/slots`, {
      params: {
        date: formattedDate,
        duration: meetingInfos.duration,
      },
    })
    .then(function (response: AxiosResponse<AvailableSlotsResponse>) {
      let parsedData = response.data.map((item) => ({
        startHours: getHours(parseJSON(item.start)),
        startMinutes: getMinutes(parseJSON(item.start)),
        endHours: getHours(parseISO(item.end)),
        endMinutes: getMinutes(parseJSON(item.end)),
      }));
      return Promise.resolve(parsedData);
    })
    .catch(function (error: AxiosError) {
      return Promise.reject(error);
    });
};

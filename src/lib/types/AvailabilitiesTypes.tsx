import { SupervisorAsStudent } from "./AuthTypes";
import { Campus } from "./CampusTypes";

export interface BaseMeetingInfos {
  supervisor: SupervisorAsStudent;
  duration: string;
  campus: Campus;
}

export interface MeetingInfosWithWantedDay extends BaseMeetingInfos {
  day: Date;
}

export interface MeetingInfosWithWantedDates extends BaseMeetingInfos {
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export interface MeetingInfosWithDateSearchRange extends BaseMeetingInfos {
  startDate: Date;
  endDate: Date;
}

export type AvailableDaysResponse = string[];

export type AvailableDay = Date;

export interface AvailableSlot {
  startHours: number;
  startMinutes: number;
  endHours: number;
  endMinutes: number;
}

export type AvailableSlotsResponse = {
  start: string;
  end: string;
  duration: string;
  remote: boolean;
}[];

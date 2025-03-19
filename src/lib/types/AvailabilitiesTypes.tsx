export interface BaseMeetingInfos {
  supervisorId: number;
  duration: string;
}

export interface MeetingInfosWithWantedDay extends BaseMeetingInfos {
  day: Date;
}

export interface MeetingInfosWithWantedDates extends BaseMeetingInfos {
  startDate: Date;
  endDate: Date;
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

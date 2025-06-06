import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MEETING_THEMES } from "./consts";
import { compareAsc, isAfter, isBefore, isSameDay } from "date-fns";
import { MeetingRequest } from "./types/MeetingRequestTypes";
import { SupervisorAsStudent } from "./types/AuthTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterSupervisorsPerCampusId(
  supervisors: SupervisorAsStudent[],
  campusId: number,
) {
  return supervisors.filter((supervisor) => supervisor.campusId === campusId);
}

export function formatDateToFrench(date: Date) {
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
  return formattedDate.replace(/^\w/, (c) => c.toUpperCase());
}

export function findCitiesPerCountryName(
  cities: { city_name: string; country_name: string }[],
  countryName: string,
) {
  return cities.filter((city) => city.country_name === countryName);
}

export function translateMeetingTheme(theme: string): string {
  return (
    MEETING_THEMES.find((meetingTheme) => meetingTheme.value === theme)
      ?.label ?? theme
  );
}

export function countRemainingMeetingRequestsPerDay({
  meetingRequests,
  date,
}: {
  meetingRequests: MeetingRequest[];
  date: Date;
}) {
  return meetingRequests.filter(
    (meeting) =>
      isSameDay(meeting.startDate, date) && isAfter(meeting.endDate, date),
  ).length;
}

export function getMeetingsBeforeDate({
  meetings,
  date,
}: {
  meetings: MeetingRequest[];
  date: Date;
}) {
  return meetings.filter((meeting) => isBefore(meeting.endDate, date));
}

export function getMeetingsAfterDate({
  meetings,
  date,
}: {
  meetings: MeetingRequest[];
  date: Date;
}) {
  return meetings.filter((meeting) => isAfter(meeting.endDate, date));
}

export function sortMeetingsPerStartDate({
  meetings,
  order,
}: {
  meetings: MeetingRequest[];
  order: "asc" | "desc";
}) {
  return [...meetings].sort((a, b) => {
    return order === "asc"
      ? compareAsc(a.startDate, b.startDate)
      : compareAsc(b.startDate, a.startDate);
  });
}

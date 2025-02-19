import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosErrors } from "./errors/consts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterSupervisorsPerCampusId(
  supervisors: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    campusId: number;
    meetingUrl: string;
  }[],
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

export function translateErrorCode({
  errorCode,
  language,
}: {
  errorCode: string | undefined;
  language: "french";
}): string {
  return (
    AxiosErrors.find((error) => error.code === errorCode)?.[
      `label_${language}`
    ] ?? "Une erreur est survenue, veuillez réessayer."
  );
}

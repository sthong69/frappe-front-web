import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

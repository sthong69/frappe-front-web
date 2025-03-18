"use client";

import type { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getHours, getMinutes } from "date-fns";
import { Badge } from "../../ui/badge";
import { formatDateToFrench, translateMeetingTheme } from "@/lib/utils";
import { useAuth } from "@/context/Auth";
import { Link } from "@tanstack/react-router";

interface MeetingCardProps {
  meeting: MeetingRequest;
  isPassed: boolean;
}

const MeetingCard = (props: MeetingCardProps) => {
  const { userRole } = useAuth();

  if (userRole === "ROLE_STUDENT") {
    return (
      <Link to={`/view-meeting?id=${props.meeting.id}`}>
        <Card
          className={`${props.isPassed ? "opacity-80" : "hover:bg-gray-100"}`}
        >
          <CardHeader className="flex flex-row flex-wrap items-start gap-2 px-4 py-3">
            <h3 className="text-sm md:text-base">
              Réunion avec {props.meeting.supervisor.lastName}{" "}
              {props.meeting.supervisor.firstName}
            </h3>
            <Badge className="ml-auto">
              {translateMeetingTheme(props.meeting.theme)}
            </Badge>
          </CardHeader>
          <CardContent className="px-4 py-2">
            <div className="flex flex-col gap-2 text-xs sm:flex-row sm:gap-4 md:gap-8 md:text-sm">
              <div className="flex items-center gap-1 md:gap-2">
                <Calendar className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
                <span>{formatDateToFrench(props.meeting.startDate)}</span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <Clock className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
                <span>
                  {getHours(props.meeting.startDate)}:
                  {getMinutes(props.meeting.startDate)
                    .toString()
                    .padStart(2, "0")}{" "}
                  - {getHours(props.meeting.endDate)}:
                  {getMinutes(props.meeting.endDate)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <MapPin className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
                <span>{props.meeting.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/view-meeting?id=${props.meeting.id}`}>
      <Card
        className={`${props.isPassed ? "opacity-80" : "hover:bg-gray-100"}`}
      >
        <CardHeader className="flex flex-row flex-wrap items-start gap-2 px-4 py-3">
          <h3 className="text-sm md:text-base">
            Réunion avec {props.meeting.student.lastName}{" "}
            {props.meeting.student.firstName}
          </h3>
          <Badge className="ml-auto">
            {translateMeetingTheme(props.meeting.theme)}
          </Badge>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <div className="flex flex-col gap-2 text-xs sm:flex-row sm:gap-4 md:gap-8 md:text-sm">
            <div className="flex items-center gap-1 md:gap-2">
              <Calendar className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
              <span>{formatDateToFrench(props.meeting.startDate)}</span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <Clock className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
              <span>
                {getHours(props.meeting.startDate)}:
                {getMinutes(props.meeting.startDate)
                  .toString()
                  .padStart(2, "0")}{" "}
                - {getHours(props.meeting.endDate)}:
                {getMinutes(props.meeting.endDate).toString().padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <MapPin className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
              <span>{props.meeting.location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MeetingCard;

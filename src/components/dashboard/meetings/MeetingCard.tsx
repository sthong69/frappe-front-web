import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { getHours, getMinutes } from "date-fns";
import { Badge } from "../../ui/badge";
import { formatDateToFrench, translateMeetingTheme } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getStudentInfoFromId } from "@/api/StudentsAPI";
import { getSupervisorInfoFromId } from "@/api/SupervisorsAPI";
import { useAuth } from "@/context/Auth";

interface MeetingCardProps {
  meeting: MeetingRequest;
  isPassed: boolean;
}

const MeetingCard = (props: MeetingCardProps) => {
  const { userRole } = useAuth();

  if (userRole === "ROLE_STUDENT") {
    const SUPERVISOR_INFO = useQuery({
      queryKey: ["supervisor", props.meeting.supervisorId],
      queryFn: () => getSupervisorInfoFromId(props.meeting.supervisorId),
    });

    if (SUPERVISOR_INFO.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <Card
        onClick={() => {}}
        className={`${props.isPassed ? "opacity-80" : "hover:bg-gray-100"}`}
      >
        <CardHeader className="flex flex-row">
          <h3>
            Réunion avec {SUPERVISOR_INFO.data?.lastName}{" "}
            {SUPERVISOR_INFO.data?.firstName}
          </h3>
          <Badge className="ml-auto">
            {translateMeetingTheme(props.meeting.theme)}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-8">
            <div className="flex flex-row gap-2">
              <Calendar /> {formatDateToFrench(props.meeting.startDate)}
            </div>
            <div className="flex flex-row gap-2">
              <Clock />
              {getHours(props.meeting.startDate)}:
              {getMinutes(props.meeting.startDate).toString().padEnd(2, "0")} -{" "}
              {getHours(props.meeting.endDate)}:
              {getMinutes(props.meeting.endDate).toString().padEnd(2, "0")}{" "}
            </div>
            <div className="flex flex-row gap-2">
              <MapPin />
              {props.meeting.location}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const STUDENT_INFO = useQuery({
    queryKey: ["student", props.meeting.studentId],
    queryFn: () => getStudentInfoFromId(props.meeting.studentId),
  });

  if (STUDENT_INFO.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      onClick={() => {}}
      className={`${props.isPassed ? "opacity-80" : "hover:bg-gray-100"}`}
    >
      <CardHeader className="flex flex-row">
        <h3>
          Réunion avec {STUDENT_INFO.data?.lastName}{" "}
          {STUDENT_INFO.data?.firstName}
        </h3>
        <Badge className="ml-auto">
          {translateMeetingTheme(props.meeting.theme)}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-8">
          <div className="flex flex-row gap-2">
            <Calendar /> {formatDateToFrench(props.meeting.startDate)}
          </div>
          <div className="flex flex-row gap-2">
            <Clock />
            {getHours(props.meeting.startDate)}:
            {getMinutes(props.meeting.startDate).toString().padEnd(2, "0")} -{" "}
            {getHours(props.meeting.endDate)}:
            {getMinutes(props.meeting.endDate).toString().padEnd(2, "0")}{" "}
          </div>
          <div className="flex flex-row gap-2">
            <MapPin />
            {props.meeting.location}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingCard;

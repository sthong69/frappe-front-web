import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { isBefore } from "date-fns";
import MeetingCard from "./MeetingCard";
import {
  countRemainingMeetingRequestsPerDay,
  getMeetingsAfterDate,
  getMeetingsBeforeDate,
  sortMeetingsPerStartDate,
} from "@/lib/utils";

interface MeetingTableProps {
  meetingRequests: MeetingRequest[];
}

const MeetingList = (props: MeetingTableProps) => {
  const PAST_MEETINGS = sortMeetingsPerStartDate({
    meetings: getMeetingsBeforeDate({
      meetings: props.meetingRequests,
      date: new Date(),
    }),
    order: "desc",
  }).slice(0, 3);

  const UPCOMING_MEETINGS = sortMeetingsPerStartDate({
    meetings: getMeetingsAfterDate({
      meetings: props.meetingRequests,
      date: new Date(),
    }),
    order: "asc",
  }).slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">
          À VENIR{" ("}
          {countRemainingMeetingRequestsPerDay({
            meetingRequests: props.meetingRequests,
            date: new Date(),
          })}{" "}
          rendez-vous restants aujourd'hui{")"}
        </h2>
        <div className="flex flex-col gap-2">
          {UPCOMING_MEETINGS.map((meeting) => (
            <MeetingCard
              key={meeting.startDate.toISOString()}
              meeting={meeting}
              isPassed={false}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">PASSÉES</h2>
        <div className="flex flex-col gap-2">
          {PAST_MEETINGS.map((meeting) => (
            <MeetingCard
              key={meeting.startDate.toISOString()}
              meeting={meeting}
              isPassed={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingList;

import type { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import MeetingCard from "./meetings/MeetingCard";
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
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-sm font-bold md:text-base">
          À VENIR{" ("}
          {countRemainingMeetingRequestsPerDay({
            meetingRequests: props.meetingRequests,
            date: new Date(),
          })}{" "}
          rendez-vous restant{"("}s{")"} aujourd'hui{")"}
        </h2>
        <div className="flex flex-col gap-2">
          {UPCOMING_MEETINGS.length > 0 ? (
            UPCOMING_MEETINGS.map((meeting) => (
              <MeetingCard
                key={meeting.startDate.toISOString()}
                meeting={meeting}
                isPassed={false}
              />
            ))
          ) : (
            <p className="text-sm italic text-muted-foreground">
              Aucun rendez-vous à venir
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-sm font-bold md:text-base">PASSÉES</h2>
        <div className="flex flex-col gap-2">
          {PAST_MEETINGS.length > 0 ? (
            PAST_MEETINGS.map((meeting) => (
              <MeetingCard
                key={meeting.startDate.toISOString()}
                meeting={meeting}
                isPassed={true}
              />
            ))
          ) : (
            <p className="text-sm italic text-muted-foreground">
              Aucun rendez-vous passé
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingList;

import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { isBefore } from "date-fns";
import MeetingCard from "./MeetingCard";
import { countMeetingRequestsPerDay } from "@/lib/utils";

interface MeetingTableProps {
  meetingRequests: MeetingRequest[];
}

const MeetingList = (props: MeetingTableProps) => {
  const PAST_MEETINGS = props.meetingRequests
    .filter((meeting) => isBefore(meeting.endDate, new Date()))
    .sort((a, b) => {
      const dateComparison = b.startDate.getDate() - a.startDate.getDate();
      return dateComparison !== 0
        ? dateComparison
        : b.startDate.getTime() - a.startDate.getTime();
    })
    .slice(0, 3);

  const UPCOMING_MEETINGS = props.meetingRequests
    .filter((meeting) => isBefore(new Date(), meeting.endDate))
    .sort((a, b) => {
      const dateComparison = a.startDate.getDate() - b.startDate.getDate();
      return dateComparison !== 0
        ? dateComparison
        : a.startDate.getTime() - b.startDate.getTime();
    })
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">
          À VENIR{" ("}
          {countMeetingRequestsPerDay({
            meetingRequests: props.meetingRequests,
            date: new Date(),
          })}{" "}
          rendez-vous aujourd'hui{")"}
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

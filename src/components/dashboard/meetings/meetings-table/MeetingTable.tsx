import Page from "@/components/Page";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { getMeetingsBeforeDate, sortMeetingsPerStartDate } from "@/lib/utils";
import { useState } from "react";
import { isBefore } from "date-fns";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { MEETING_THEMES } from "@/lib/consts";

interface MeetingTableProps {
  meetingRequests: MeetingRequest[];
}

const MeetingTable = (props: MeetingTableProps) => {
  const [hidePastMeetings, setHidePastMeetings] = useState(true);
  const [search, setSearch] = useState("");

  const filterMeetings = (meeting: MeetingRequest) => {
    const meetingTheme =
      MEETING_THEMES.find(
        (theme) => theme.value === meeting.theme,
      )?.label.toLowerCase() || "";
    const meetingRequestDescription = meeting.requestDescription.toLowerCase();
    const searchLower = search.toLowerCase();
    const isPastMeeting = isBefore(meeting.endDate, new Date());

    return (
      (!hidePastMeetings || !isPastMeeting) &&
      (search === "" ||
        meetingTheme.includes(searchLower) ||
        meetingRequestDescription.includes(searchLower))
    );
  };

  return (
    <Page title="VOS RENDEZ-VOUS">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-end space-x-2 py-2">
            <Input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-end space-x-2 py-2">
            <Label htmlFor="hidePastMeetings">
              Masquer les rendez-vous passés
            </Label>
            <Switch
              id="hidePastMeetings"
              checked={hidePastMeetings}
              onCheckedChange={() => setHidePastMeetings(!hidePastMeetings)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={sortMeetingsPerStartDate({
              meetings: props.meetingRequests,
              order: "asc",
            })}
            filterFn={filterMeetings}
          />
        </CardContent>
      </Card>
    </Page>
  );
};

export default MeetingTable;

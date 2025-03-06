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

interface MeetingTableProps {
  meetingRequests: MeetingRequest[];
}

const MeetingTable = (props: MeetingTableProps) => {
  const [hidePastMeetings, setHidePastMeetings] = useState(true);

  const filterPastMeetings = (meeting: MeetingRequest) => {
    return !hidePastMeetings || !isBefore(meeting.endDate, new Date());
  };

  return (
    <Page title="VOS RENDEZ-VOUS">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center justify-end space-x-2 py-4">
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
            filterFn={filterPastMeetings}
          />
        </CardContent>
      </Card>
    </Page>
  );
};

export default MeetingTable;

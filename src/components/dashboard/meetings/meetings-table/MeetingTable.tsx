import Page from "@/components/Page";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { supervisorColumns } from "./supervisor-columns";
import { studentColumns } from "./student-columns";
import { DataTable } from "@/components/ui/data-table";
import { cn, formatDateToFrench, sortMeetingsPerStartDate } from "@/lib/utils";
import { useState } from "react";
import { isBefore, isSameDay } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { MEETING_THEMES } from "@/lib/consts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FilterX } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/context/Auth";

interface MeetingTableProps {
  meetingRequests: MeetingRequest[];
}

const MeetingTable = (props: MeetingTableProps) => {
  const { userRole } = useAuth();
  const [hidePastMeetings, setHidePastMeetings] = useState(true);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  const filterMeetings = (meeting: MeetingRequest) => {
    const meetingTheme =
      MEETING_THEMES.find(
        (theme) => theme.value === meeting.theme,
      )?.label.toLowerCase() || "";
    const meetingRequestDescription = meeting.requestDescription.toLowerCase();
    const meetingStudentFirstName = meeting.student.firstName.toLowerCase();
    const meetingStudentLastName = meeting.student.lastName.toLowerCase();
    const meetingSupervisorFirstName =
      meeting.supervisor.firstName.toLowerCase();
    const meetingSupervisorLastName = meeting.supervisor.lastName.toLowerCase();
    const searchLower = search.toLowerCase();
    const isPastMeeting = isBefore(meeting.endDate, new Date());

    return (
      (!hidePastMeetings || !isPastMeeting) &&
      (date ? isSameDay(meeting.startDate, date) : true) &&
      (search === "" ||
        meetingTheme.includes(searchLower) ||
        meetingRequestDescription.includes(searchLower) ||
        meetingStudentFirstName.includes(searchLower) ||
        meetingStudentLastName.includes(searchLower) ||
        meetingSupervisorFirstName.includes(searchLower) ||
        meetingSupervisorLastName.includes(searchLower))
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
            <Popover>
              <div className="flex flex-row gap-2">
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon />
                    {date ? (
                      formatDateToFrench(date)
                    ) : (
                      <span>Rechercher par jour...</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  onClick={() => setDate(undefined)}
                >
                  <FilterX />
                </Button>
              </div>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={fr}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
            columns={
              userRole === "ROLE_SUPERVISOR"
                ? supervisorColumns
                : studentColumns
            }
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

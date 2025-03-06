import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import Page from "../Page";
import { useMemo, useState } from "react";
import { getHours, getMinutes, isBefore } from "date-fns";
import { Badge } from "../ui/badge";
import { CalendarClock, Clock, MapPin, User } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  formatDateToFrench,
  sortMeetingsPerStartDate,
  translateMeetingTheme,
} from "@/lib/utils";

interface MeetingTableProps {
  meetingRequests: MeetingRequest[];
}

const MeetingTable = (props: MeetingTableProps) => {
  const [hidePastMeetings, setHidePastMeetings] = useState(true);

  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case "ACCEPTED":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Approuvé</Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            En attente
          </Badge>
        );
      case "DECLINED":
        return <Badge className="bg-red-500 hover:bg-red-600">Refusé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredMeetings = useMemo(() => {
    let meetingRequests = props.meetingRequests;
    const now = new Date();

    if (hidePastMeetings) {
      return sortMeetingsPerStartDate({
        meetings: props.meetingRequests.filter((meeting) =>
          isBefore(now, meeting.endDate),
        ),
        order: "asc",
      });
    }

    return sortMeetingsPerStartDate({
      meetings: meetingRequests,
      order: "asc",
    });
  }, [hidePastMeetings, props.meetingRequests]);
  return (
    <Page title="VOS RENDEZ-VOUS">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="hide-past-meetings"
              checked={hidePastMeetings}
              onCheckedChange={setHidePastMeetings}
            />
            <Label htmlFor="hide-past-meetings">
              Masquer les rendez-vous passés
            </Label>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Thème</TableHead>
                  <TableHead className="hidden md:table-cell">Lieu</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Description
                  </TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Participants
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMeetings.length > 0 ? (
                  filteredMeetings.map((meeting, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">
                          {formatDateToFrench(meeting.startDate)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {`${getHours(meeting.startDate)}:${getMinutes(
                            meeting.startDate,
                          )
                            .toString()
                            .padEnd(
                              2,
                              "0",
                            )} - ${getHours(meeting.endDate)}:${getMinutes(
                            meeting.endDate,
                          )
                            .toString()
                            .padEnd(2, "0")}`}
                        </div>
                      </TableCell>
                      <TableCell>
                        {translateMeetingTheme(meeting.theme)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {meeting.location}
                        </div>
                      </TableCell>
                      <TableCell className="hidden max-w-[200px] truncate lg:table-cell">
                        {meeting.requestDescription}
                      </TableCell>
                      <TableCell>{getStatusBadge(meeting.status)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col text-xs">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" /> Étudiant :{" "}
                            {meeting.studentId}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" /> Encadrant :{" "}
                            {meeting.supervisorId}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No meetings to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Page>
  );
};

export default MeetingTable;

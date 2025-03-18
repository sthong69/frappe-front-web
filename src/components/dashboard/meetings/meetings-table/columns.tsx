import { Badge } from "@/components/ui/badge";
import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { formatDateToFrench } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { getHours, getMinutes } from "date-fns";
import { Clock, User } from "lucide-react";
import { translateMeetingTheme } from "@/lib/utils";
import { SortableColumnHeader } from "@/components/ui/sortable-column-header";

const getStatusBadge = (status: string) => {
  switch (status.toUpperCase()) {
    case "ACCEPTED":
      return (
        <Badge className="bg-green-500 hover:bg-green-600">Approuvé</Badge>
      );
    case "PENDING":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600">En attente</Badge>
      );
    case "DECLINED":
      return <Badge className="bg-red-500 hover:bg-red-600">Refusé</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const columns: ColumnDef<MeetingRequest>[] = [
  {
    header: ({ column }) => (
      <SortableColumnHeader
        column={column}
        title="Date"
        ascLabel="Ordre chronologique"
        descLabel="Ordre chronologique inverse"
      />
    ),
    accessorKey: "startDate",
    cell: ({ row }) => {
      return (
        <>
          <div className="font-medium">
            {formatDateToFrench(row.getValue("startDate"))}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            {`${getHours(row.getValue("startDate"))}:${getMinutes(
              row.getValue("startDate"),
            )
              .toString()
              .padEnd(2, "0")} - ${getHours(row.original.endDate)}:${getMinutes(
              row.original.endDate,
            )
              .toString()
              .padEnd(2, "0")}`}
          </div>
        </>
      );
    },
  },
  {
    header: "Thème",
    accessorKey: "theme",
    cell: ({ row }) => {
      return translateMeetingTheme(row.getValue("theme"));
    },
  },
  {
    header: "Participants",
    accessorKey: "studentId",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col text-xs">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> Étudiant :{" "}
            {row.original.student.lastName} {row.original.student.firstName}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" /> Encadrant :{" "}
            {row.original.supervisor.lastName}{" "}
            {row.original.supervisor.firstName}
          </span>
        </div>
      );
    },
  },
  {
    header: "Description",
    accessorKey: "requestDescription",
  },
  {
    header: "Statut",
    accessorKey: "status",
    cell: ({ row }) => {
      return getStatusBadge(row.getValue("status"));
    },
  },
  {
    header: "Lieu",
    accessorKey: "location",
  },
];

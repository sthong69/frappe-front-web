import {
  getStudentMeetingRequests,
  getSupervisorMeetingRequests,
} from "@/api/MeetingRequestsAPI";
import MeetingTable from "@/components/dashboard/MeetingTable";
import Page from "@/components/Page";
import { useAuth } from "@/context/Auth";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard/meetings")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole, user } = useAuth();
  if (userRole == "ROLE_STUDENT") {
    const MEETING_REQUESTS = useQuery({
      queryKey: ["meetingRequests", user?.id],
      queryFn: getStudentMeetingRequests,
    });

    if (MEETING_REQUESTS.isLoading || !MEETING_REQUESTS.data) {
      return <Page title={`Chargement...`} children={undefined} />;
    }

    return <MeetingTable meetingRequests={MEETING_REQUESTS.data} />;
  }

  if (userRole == "ROLE_SUPERVISOR") {
    const MEETING_REQUESTS = useQuery({
      queryKey: ["meetingRequests", user?.id],
      queryFn: getSupervisorMeetingRequests,
    });

    if (MEETING_REQUESTS.isLoading || !MEETING_REQUESTS.data) {
      return <Page title={`Chargement...`} children={undefined} />;
    }

    return <MeetingTable meetingRequests={MEETING_REQUESTS.data} />;
  }
}

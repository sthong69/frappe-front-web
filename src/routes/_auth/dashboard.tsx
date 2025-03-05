import { createFileRoute, Link } from "@tanstack/react-router";
import Page from "@/components/Page";
import { useAuth } from "@/context/Auth";
import { Button } from "@/components/ui/button";
import {
  getStudentMeetingRequests,
  getSupervisorMeetingRequests,
} from "@/api/MeetingRequestsAPI";
import { useQuery } from "@tanstack/react-query";
import { formatDateToFrench } from "@/lib/utils";
import { getHours, getMinutes, parseJSON } from "date-fns";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import SupervisorDashboard from "@/components/dashboard/SupervisorDashboard";

export const Route = createFileRoute("/_auth/dashboard")({
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

    return <StudentDashboard meetingRequests={MEETING_REQUESTS.data} />;
  }

  if (userRole == "ROLE_SUPERVISOR") {
    const MEETING_REQUESTS = useQuery({
      queryKey: ["meetingRequests", user?.id],
      queryFn: getSupervisorMeetingRequests,
    });

    if (MEETING_REQUESTS.isLoading || !MEETING_REQUESTS.data) {
      return <Page title={`Chargement...`} children={undefined} />;
    }

    return <SupervisorDashboard meetingRequests={MEETING_REQUESTS.data} />;
  }

  return (
    <Page
      title={
        "Une erreur s'est produite lors de la connexion, veuillez réessayer."
      }
    >
      Erreur de connexion
    </Page>
  );
}

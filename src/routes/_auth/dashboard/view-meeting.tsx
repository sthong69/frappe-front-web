import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/context/Auth";
import { useQuery } from "@tanstack/react-query";
import {
  getMeetingAction,
  getMeetingInfoPerIdAsStudent,
  getMeetingInfoPerIdAsSupervisor,
} from "@/api/MeetingRequestsAPI";
import Page from "@/components/Page";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageNotFound from "@/components/PageNotFound";
import MeetingRecord from "@/components/dashboard/meetings/MeetingRecord";

type ViewMeetingSearchParams = {
  id: number;
};

export const Route = createFileRoute("/_auth/dashboard/view-meeting")({
  component: RouteComponent,
  validateSearch: (
    search: Record<string, unknown>,
  ): ViewMeetingSearchParams => {
    return {
      id: search.id as number,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useSearch();
  const { userRole } = useAuth();

  const MEETING_INFOS = useQuery({
    queryKey: ["meeting", userRole, id],
    queryFn: () => {
      if (userRole === "ROLE_STUDENT") {
        return getMeetingInfoPerIdAsStudent(id);
      }
      return getMeetingInfoPerIdAsSupervisor(id);
    },
  });

  const MEETING_ACTION = useQuery({
    queryKey: ["meeting-action", id],
    queryFn: () => getMeetingAction(id),
  });

  if (MEETING_INFOS.isLoading || MEETING_ACTION.isLoading) {
    return (
      <Page className="flex flex-1 items-center justify-center">
        <LoadingSpinner waitingText="Chargement de la fiche de réunion" />
      </Page>
    );
  }

  if (MEETING_INFOS.isError || !MEETING_INFOS.data) {
    return <PageNotFound />;
  }

  return (
    <Page>
      <MeetingRecord
        meeting={MEETING_INFOS.data}
        action={MEETING_ACTION.data ?? undefined}
      />
    </Page>
  );
}

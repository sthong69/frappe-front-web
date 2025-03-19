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
import { AxiosError } from "axios";

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
        return getMeetingInfoPerIdAsStudent({ meetingId: id });
      }
      return getMeetingInfoPerIdAsSupervisor({ meetingId: id });
    },
  });

  const MEETING_ACTION = useQuery({
    queryKey: ["meeting-action", id],
    queryFn: () => getMeetingAction({ meetingId: id }),
    retry: (failureCount, error: AxiosError) => {
      if (error.status === 404) {
        return false;
      }
      if (failureCount <= 3) {
        return true;
      }
      return false;
    },
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

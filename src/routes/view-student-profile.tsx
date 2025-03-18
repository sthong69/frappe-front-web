import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getStudentInfoFromId } from "@/api/StudentsAPI";
import Page from "@/components/Page";
import StudentProfile from "@/components/form/StudentProfile";
import LoadingSpinner from "@/components/LoadingSpinner";
import PageNotFound from "@/components/PageNotFound";

type ViewStudentProfileSearchParams = {
  id: number;
};

export const Route = createFileRoute("/view-student-profile")({
  component: RouteComponent,
  validateSearch: (
    search: Record<string, unknown>,
  ): ViewStudentProfileSearchParams => {
    return {
      id: search.id as number,
    };
  },
});

function RouteComponent() {
  const { id } = Route.useSearch();

  const STUDENT_INFOS = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudentInfoFromId(id),
  });

  if (STUDENT_INFOS.isLoading) {
    return (
      <Page className="flex flex-1 items-center justify-center">
        <LoadingSpinner waitingText="Chargement du profil de l'étudiant" />
      </Page>
    );
  }

  if (STUDENT_INFOS.isError || !STUDENT_INFOS.data) {
    return <PageNotFound />;
  }

  return (
    <Page>
      <StudentProfile student={STUDENT_INFOS.data} />
    </Page>
  );
}

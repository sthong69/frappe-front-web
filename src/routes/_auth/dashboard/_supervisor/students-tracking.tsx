import { getStudentsList } from "@/api/StudentsAPI";
import StudentsTrackingTable from "@/components/dashboard/students-tracking-table/StudentsTrackingTable";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/dashboard/_supervisor/students-tracking",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const STUDENTS_LIST = useQuery({
    queryKey: ["studentsList"],
    queryFn: getStudentsList,
  });

  if (STUDENTS_LIST.isLoading) {
    return <div>Loading...</div>;
  }

  if (STUDENTS_LIST.isError || !STUDENTS_LIST.data) {
    return <div>Error: {STUDENTS_LIST.error?.message}</div>;
  }

  return <StudentsTrackingTable students={STUDENTS_LIST.data} />;
}

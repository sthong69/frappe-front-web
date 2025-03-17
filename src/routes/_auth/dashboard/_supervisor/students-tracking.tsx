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
  return "Hello /_auth/_supervisor/students-tracking!";
}

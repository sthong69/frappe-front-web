import StudentProfile from "@/components/form/StudentProfile";
import SupervisorProfile from "@/components/form/SupervisorProfile";
import Page from "@/components/Page";
import { useAuth } from "@/context/Auth";
import { Student, Supervisor } from "@/lib/types/AuthTypes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, userRole } = useAuth();
  return (
    <Page>
      {userRole === "ROLE_STUDENT" ? (
        <StudentProfile student={user as Student} editable />
      ) : (
        <SupervisorProfile supervisor={user as Supervisor} editable />
      )}
    </Page>
  );
}

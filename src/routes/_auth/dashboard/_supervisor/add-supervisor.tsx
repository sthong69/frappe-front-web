import AddSupervisorForm from "@/components/form/AddSupervisorForm";
import Page from "@/components/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_auth/dashboard/_supervisor/add-supervisor",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page title="AJOUTEZ UN COLLABORATEUR">
      <AddSupervisorForm />
    </Page>
  );
}

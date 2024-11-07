import { createFileRoute } from "@tanstack/react-router";
import Page from "@/components/Page";
import LoginForm from "@/components/form/LoginForm";
export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page
      className="flex flex-1 flex-col"
      title="SITE DE PRISE DE RENDEZ-VOUS D’ORIENTATION POUR IMT ATLANTIQUE"
    >
      <LoginForm />
    </Page>
  );
}

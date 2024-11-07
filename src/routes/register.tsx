import Page from "@/components/Page";
import RegisterForm from "@/components/form/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page
      className="flex flex-1 flex-col"
      title="CRÉATION D'UN COMPTE ÉTUDIANT"
    >
      <RegisterForm />
    </Page>
  );
}

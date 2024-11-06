import Page from "@/components/Page";
import RegisterForm from "@/components/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page className="flex flex-1 flex-col">
      <h2>CRÉATION D'UN COMPTE ÉTUDIANT</h2>
      <RegisterForm />
    </Page>
  );
}

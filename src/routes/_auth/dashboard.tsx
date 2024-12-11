import { createFileRoute } from "@tanstack/react-router";
import Page from "@/components/Page";
import { useAuth } from "@/context/Auth";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuth();
  return (
    <Page
      title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ${user?.student ? "ÉTUDIANT" : "ENCADRANT"}`}
    >
      Dashboard
    </Page>
  );
}

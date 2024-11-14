import { createFileRoute } from "@tanstack/react-router";
import Page from "@/components/Page";
import { useContext } from "react";
import { AuthContext } from "@/context/Auth";
import { AuthContextType } from "@/types/AuthTypes";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useContext(AuthContext) as AuthContextType;

  return (
    <Page
      title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ${user?.student ? "ÉTUDIANT" : "ENCADRANT"}`}
    >
      Dashboard
    </Page>
  );
}

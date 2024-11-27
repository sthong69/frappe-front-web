import { createFileRoute, Link } from "@tanstack/react-router";
import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/LoginForm";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page className="flex flex-1 flex-col">
      <h2>SITE DE PRISE DE RENDEZ-VOUS D’ORIENTATION POUR IMT ATLANTIQUE</h2>
      <LoginForm />
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p>PAS ENCORE DE COMPTE ?</p>
        <Button className="w-96 font-semibold text-black">
          <Link to="/register">S'inscrire</Link>
        </Button>
      </div>
    </Page>
  );
}

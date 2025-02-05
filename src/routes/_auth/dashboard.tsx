import { createFileRoute, Link } from "@tanstack/react-router";
import Page from "@/components/Page";
import { useAuth } from "@/context/Auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole } = useAuth();
  if (userRole == "ROLE_STUDENT") {
    return (
      <Page title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ÉTUDIANT`}>
        <div className="grid h-full flex-1 grid-cols-2 divide-x divide-black pt-8">
          <div className="flex h-full flex-col gap-8">
            <h2 className="text-center font-bold">MES RENDEZ-VOUS</h2>
            <div>
              <h3 className="font-bold">À VENIR</h3>
            </div>
            <div>
              <h3 className="font-bold">PASSÉS</h3>
            </div>
          </div>
          <div className="flex h-full flex-col gap-8 pl-8">
            <h2 className="text-center font-bold">PRENDRE RENDEZ-VOUS</h2>
            <p>
              Les encadrantes TING sont là pour toi. N’hésite pas à prendre
              rendez-vous avec elles si tu as besoin d’aide pour ton
              orientation.
            </p>
            <Link to="/meeting" className="ml-auto mt-auto">
              <Button className="w-96 font-semibold text-black">
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      </Page>
    );
  }

  if (userRole == "ROLE_SUPERVISOR") {
    return (
      <Page title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ENCADRANT`}>
        <div className="grid h-full grid-cols-2 py-8">
          <div className="flex h-full flex-col gap-8 p-4">
            <h2 className="text-center font-bold">RENDEZ-VOUS</h2>
            <div>
              <h3 className="font-bold">À VENIR</h3>
            </div>
            <div>
              <h3 className="font-bold">PASSÉS</h3>
            </div>
          </div>
          <div className="flex h-full flex-col gap-8 p-4">
            <h2 className="text-center font-bold">AJOUTEZ UN COLLABORATEUR</h2>
            <p>
              Vous pouvez ajouter un collaborateur qui pourra prendre des
              étudiants en rendez-vous et modifier le fichier de suivi.
            </p>
          </div>
          <div className="flex h-full flex-col gap-8 p-4">
            <h2 className="text-center font-bold">SUIVI DES ÉLÈVES</h2>
            <p>
              Le tableau de suivi des élèves vous permet de gérer des fiches de
              suivi de chaque étudiant d’IMT Atlantique.
            </p>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page
      title={
        "Une erreur s'est produite lors de la connexion, veuillez réessayer."
      }
    >
      Erreur de connexion
    </Page>
  );
}

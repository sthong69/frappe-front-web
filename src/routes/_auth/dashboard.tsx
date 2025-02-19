import { createFileRoute, Link } from "@tanstack/react-router";
import Page from "@/components/Page";
import { useAuth } from "@/context/Auth";
import { Button } from "@/components/ui/button";
import { getSupervisorMeetingRequests } from "@/api/MeetingRequestsAPI";
import { useQuery } from "@tanstack/react-query";
import { formatDateToFrench } from "@/lib/utils";
import { getHours, getMinutes, parseJSON } from "date-fns";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userRole, user } = useAuth();
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
    const MEETING_REQUESTS = useQuery({
      queryKey: ["meetingRequests", user?.id],
      queryFn: getSupervisorMeetingRequests,
    });

    if (MEETING_REQUESTS.isLoading || !MEETING_REQUESTS.data) {
      return <Page title={`Chargement...`} children={undefined} />;
    }

    return (
      <Page title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ENCADRANT`}>
        <div className="grid h-full grid-cols-2 py-8">
          <div className="flex h-full flex-col gap-8 p-4">
            <h2 className="text-center font-bold">RENDEZ-VOUS</h2>
            <div>
              <h3 className="font-bold">À VENIR</h3>
              <div>
                {MEETING_REQUESTS.data.map(
                  (request: {
                    startDate: string;
                    endDate: string;
                    theme: string;
                    location: string;
                    requestDescription: string;
                    status: string;
                    studentId: number;
                    supervisorId: number;
                  }) => (
                    <li key={request.requestDescription}>
                      {formatDateToFrench(parseJSON(request.startDate))} |{" "}
                      {getHours(parseJSON(request.startDate))}:
                      {getMinutes(parseJSON(request.startDate))
                        .toString()
                        .padEnd(2, "0")}{" "}
                      - {getHours(parseJSON(request.endDate))}:
                      {getMinutes(parseJSON(request.endDate))
                        .toString()
                        .padEnd(2, "0")}{" "}
                      | {request.theme} - studentId {request.studentId}
                    </li>
                  ),
                )}
              </div>
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

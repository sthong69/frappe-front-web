import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import Page from "../Page";
import MeetingList from "./MeetingList";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

interface SupervisorDashboardProps {
  meetingRequests: MeetingRequest[];
}

const SupervisorDashboard = (props: SupervisorDashboardProps) => {
  return (
    <Page title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ENCADRANT`}>
      <div className="grid h-full grid-cols-2 py-8">
        <div>
          <div className="flex h-full flex-col gap-8 p-4">
            <h2 className="text-center font-bold">VOS RENDEZ-VOUS</h2>
            <MeetingList meetingRequests={props.meetingRequests} />
            <Button className="ml-auto w-96 font-semibold text-black">
              <Link to="/dashboard/meetings">Voir tous les rendez-vous</Link>
            </Button>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-8 p-4">
            <h2 className="text-center font-bold">SUIVI DES ÉLÈVES</h2>
            <p>
              Le tableau de suivi des élèves vous permet de gérer des fiches de
              suivi de chaque étudiant d’IMT Atlantique.
            </p>
            <Button className="ml-auto w-96 font-semibold text-black">
              Voir le tableau de suivi
            </Button>
          </div>
          <div className="flex flex-col gap-8 p-4">
            <h2 className="text-center font-bold">AJOUTEZ UN COLLABORATEUR</h2>
            <p>
              Vous pouvez ajouter un collaborateur qui pourra prendre des
              étudiants en rendez-vous et modifier le fichier de suivi.
            </p>
            <Button className="ml-auto w-96 font-semibold text-black">
              Ajouter un collaborateur
            </Button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SupervisorDashboard;

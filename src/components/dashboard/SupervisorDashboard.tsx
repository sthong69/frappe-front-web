import type { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
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
      <div className="grid h-full grid-cols-1 divide-y divide-black pt-8 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="pb-8 md:pb-0">
          <div className="flex h-full flex-col gap-8 md:pr-8">
            <h2 className="text-center font-bold">VOS RENDEZ-VOUS</h2>
            <MeetingList meetingRequests={props.meetingRequests} />
            <Link
              className="mx-auto md:ml-auto md:mr-0"
              to="/dashboard/meetings"
            >
              <Button className="w-full font-semibold text-black sm:w-auto sm:min-w-[16rem] md:w-full lg:w-96">
                Voir tous les rendez-vous
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-8 pt-8 md:gap-16 md:pl-8 md:pt-0">
          <div className="flex flex-col gap-4 md:gap-8">
            <h2 className="text-center font-bold">SUIVI DES ÉLÈVES</h2>
            <p className="text-sm md:text-base">
              Le tableau de suivi des élèves vous permet de gérer des fiches de
              suivi de chaque étudiant d'IMT Atlantique.
            </p>
            <Link
              className="mx-auto md:ml-auto md:mr-0"
              to="/dashboard/students-tracking"
            >
              <Button className="w-full font-semibold text-black sm:w-auto sm:min-w-[16rem] md:w-full lg:w-96">
                Voir le tableau de suivi
              </Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            <h2 className="text-center font-bold">AJOUTEZ UN COLLABORATEUR</h2>
            <p className="text-sm md:text-base">
              Vous pouvez ajouter un collaborateur qui pourra prendre des
              étudiants en rendez-vous et modifier le fichier de suivi.
            </p>
            <Link
              className="mx-auto md:ml-auto md:mr-0"
              to="/dashboard/add-supervisor"
            >
              <Button className="w-full font-semibold text-black sm:w-auto sm:min-w-[16rem] md:w-full lg:w-96">
                Ajouter un collaborateur
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SupervisorDashboard;

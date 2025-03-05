import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { formatDateToFrench } from "@/lib/utils";
import { parseJSON, getHours, getMinutes } from "date-fns";
import Page from "../Page";

interface SupervisorDashboardProps {
  meetingRequests: MeetingRequest[];
}

const SupervisorDashboard = (props: SupervisorDashboardProps) => {
  return (
    <Page title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ENCADRANT`}>
      <div className="grid h-full grid-cols-2 py-8">
        <div className="flex h-full flex-col gap-8 p-4">
          <h2 className="text-center font-bold">RENDEZ-VOUS</h2>
          <div>
            <h3 className="font-bold">À VENIR</h3>
            <div>
              {props.meetingRequests.map(
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
};

export default SupervisorDashboard;

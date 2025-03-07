import Page from "../Page";
import { Button } from "../ui/button";
import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import MeetingList from "./MeetingList";
import { Link } from "@tanstack/react-router";

interface StudentDashboardProps {
  meetingRequests: MeetingRequest[];
}

const StudentDashboard = (props: StudentDashboardProps) => {
  return (
    <Page title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ÉTUDIANT`}>
      <div className="grid h-full flex-1 grid-cols-2 divide-x divide-black pt-8">
        <div className="flex h-full flex-col gap-8 p-4">
          <h2 className="text-center font-bold">VOS RENDEZ-VOUS</h2>
          <MeetingList meetingRequests={props.meetingRequests} />
          <Link to="/dashboard/meetings">
            <Button className="ml-auto w-96 font-semibold text-black">
              Voir tous les rendez-vous
            </Button>
          </Link>
        </div>
        <div className="flex h-full flex-col gap-8 pl-8">
          <h2 className="text-center font-bold">PRENDRE RENDEZ-VOUS</h2>
          <p>
            Les encadrantes TING sont là pour toi. N’hésite pas à prendre
            rendez-vous avec elles si tu as besoin d’aide pour ton orientation.
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
};

export default StudentDashboard;

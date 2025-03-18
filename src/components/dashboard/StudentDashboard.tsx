import Page from "../Page";
import { Button } from "../ui/button";
import type { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import MeetingList from "./MeetingList";
import { Link } from "@tanstack/react-router";

interface StudentDashboardProps {
  meetingRequests: MeetingRequest[];
}

const StudentDashboard = (props: StudentDashboardProps) => {
  return (
    <Page title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ÉTUDIANT`}>
      <div className="grid h-full flex-1 grid-cols-1 divide-y divide-black pt-8 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="pb-8 md:pb-0">
          <div className="flex h-full flex-col gap-4 md:gap-8 md:pr-8">
            <h2 className="text-center font-bold">VOS RENDEZ-VOUS</h2>
            <MeetingList meetingRequests={props.meetingRequests} />
            <Link
              className="mx-auto mt-4 md:ml-auto md:mr-0"
              to="/dashboard/meetings"
            >
              <Button className="w-full font-semibold text-black sm:w-auto sm:min-w-[16rem] md:w-full lg:w-96">
                Voir tous les rendez-vous
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex h-full flex-col gap-4 pt-8 md:gap-8 md:pl-8 md:pt-0">
          <h2 className="text-center font-bold">PRENDRE RENDEZ-VOUS</h2>
          <p className="text-sm md:text-base">
            Les encadrantes TING sont là pour toi. N'hésite pas à prendre
            rendez-vous avec elles si tu as besoin d'aide pour ton orientation.
          </p>
          <Link
            to="/meeting"
            className="mx-auto mt-auto md:ml-auto md:mr-0 md:mt-0"
          >
            <Button className="w-full font-semibold text-black sm:w-auto sm:min-w-[16rem] md:w-full lg:w-96">
              Prendre rendez-vous
            </Button>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default StudentDashboard;

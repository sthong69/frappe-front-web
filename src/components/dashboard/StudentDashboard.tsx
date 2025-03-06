import { Link } from "lucide-react";
import Page from "../Page";
import { Button } from "../ui/button";
import { MeetingRequest } from "@/lib/types/MeetingRequestTypes";
import { countMeetingRequestsPerDay } from "@/lib/utils";

interface StudentDashboardProps {
  meetingRequests: MeetingRequest[];
}

const StudentDashboard = (props: StudentDashboardProps) => {
  return (
    <Page title={`VOUS ÊTES CONNECTÉ À VOTRE ESPACE ÉTUDIANT`}>
      <div className="grid h-full flex-1 grid-cols-2 divide-x divide-black pt-8">
        <div className="flex h-full flex-col gap-8">
          <h2 className="text-center font-bold">VOS RENDEZ-VOUS</h2>
          <div>
            <h3 className="font-bold">
              À VENIR
              {countMeetingRequestsPerDay({
                meetingRequests: props.meetingRequests,
                date: new Date(),
              })}{" "}
              rendez-vous aujourd'hui
            </h3>
          </div>
          <div>
            <h3 className="font-bold">PASSÉS</h3>
          </div>
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

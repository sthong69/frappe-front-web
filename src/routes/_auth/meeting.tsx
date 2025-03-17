import ChooseMeetingForm from "@/components/form/choose-meeting/ChooseMeetingForm";
import Page from "@/components/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/meeting")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page
      className="flex min-h-screen flex-1 flex-col"
      title="PRENDRE RENDEZ-VOUS"
    >
      <ChooseMeetingForm />
    </Page>
  );
}

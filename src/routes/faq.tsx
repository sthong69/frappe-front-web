import { createFileRoute } from "@tanstack/react-router";
import Accordion from "@/components/ui/accordion";
import Page from "@/components/Page";

export const Route = createFileRoute("/faq")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Page>
        <Accordion />
      </Page>
    </>
  );
}

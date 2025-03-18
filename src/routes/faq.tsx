import { createFileRoute } from "@tanstack/react-router";
import Page from "@/components/Page";
import FAQSection from "@/components/FAQSection";

export const Route = createFileRoute("/faq")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Page>
        <FAQSection />
      </Page>
    </>
  );
}

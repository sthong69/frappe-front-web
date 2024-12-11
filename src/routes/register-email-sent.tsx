import Page from "@/components/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register-email-sent")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page className="text-center">
      Un e-mail de confirmation a été envoyé. Merci de valider votre compte !
    </Page>
  );
}

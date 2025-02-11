import ProfileForm from "@/components/form/StudentProfileForm";
import Page from "@/components/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page>
      <ProfileForm />
    </Page>
  );
}

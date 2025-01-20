import ProfileForm from "@/components/form/StudentProfileForm";
import Page from "@/components/Page";
import { useAuth } from "@/context/Auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Page title="Votre profil FRAPPE">
      <ProfileForm />
    </Page>
  );
}

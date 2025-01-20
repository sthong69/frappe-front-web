import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    console.log("Checking auth");
    const authStatus = await context.auth.isAuthenticated();

    if (!authStatus) {
      toast.warning("Vous devez être connecté pour accéder à cette page.");
      throw redirect({
        to: "/",
      });
    }

    const fetchStatus = await context.auth.fetchUserInfo();

    if (!fetchStatus) {
      toast.error("Une erreur s'est produite. Veuillez vous reconnecter.");
      throw redirect({
        to: "/",
      });
    }

    if (!context.auth.isProfileComplete() && location.pathname !== "/profile") {
      toast.warning("Veuillez compléter votre profil avant de continuer.");
      throw redirect({
        to: "/profile",
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}

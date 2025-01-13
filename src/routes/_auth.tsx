import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async ({ context, location }) => {
    const isAuthentified = await context.auth.isAuthenticated();
    console.log("authenticated1");
    if (!isAuthentified) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
    console.log("authenticated2");
    console.log(context.auth.isProfileComplete());
    if (!context.auth.isProfileComplete() && location.pathname !== "/profile") {
      toast("Veuillez compléter votre profil avant de continuer.");
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

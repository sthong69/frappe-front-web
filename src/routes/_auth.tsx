import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    console.log(context);
    if (!context.auth.isLoaded) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    } else if (context.auth.isLoaded && !context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}

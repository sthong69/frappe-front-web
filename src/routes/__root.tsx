import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthContextType } from "@/types/AuthTypes";
import { useAuth } from "@/context/Auth";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <RootComponent />,
});

function RootComponent() {
  const { user } = useAuth();
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <div
          className={`min-h-screen ${user ? (user.student ? "bg-student" : "bg-supervisor") : "bg-white"}`}
        >
          <Navbar />
          <Outlet />
        </div>
      </main>
      <Toaster />
    </>
  );
}

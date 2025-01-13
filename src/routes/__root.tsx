import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthContextType } from "@/lib/types/AuthTypes";
import { useAuth } from "@/context/Auth";

interface RouterContext {
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <RootComponent />,
});

function RootComponent() {
  const { student } = useAuth();
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <div
          className={`min-h-screen ${student ? (student.student ? "bg-student" : "bg-supervisor") : "bg-white"}`}
        >
          <Navbar />
          <Outlet />
          <Toaster />
        </div>
      </main>
    </>
  );
}

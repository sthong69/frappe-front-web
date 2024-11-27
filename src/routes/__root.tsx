import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <main className="flex min-h-screen flex-col">
        <Navbar />
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}

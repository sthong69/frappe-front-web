import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthContext } from "@/context/Auth";
import { AuthContextType } from "@/types/AuthTypes";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { user } = React.useContext(AuthContext) as AuthContextType;
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

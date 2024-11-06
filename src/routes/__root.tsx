import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <body className="flex h-screen flex-col">
        <Navbar />
        <Outlet />
      </body>
    </React.Fragment>
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recover-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /recover-password!";
}

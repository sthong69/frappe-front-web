import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rendez-vous")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /rendez-vous!";
}

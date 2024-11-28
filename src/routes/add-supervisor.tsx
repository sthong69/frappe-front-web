import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/add-supervisor")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /add-supervisor!";
}

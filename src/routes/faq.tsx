import { createFileRoute } from "@tanstack/react-router";
import Accrodion from "@/components/ui/Accrodion"

export const Route = createFileRoute("/faq")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
    <div>
      <Accrodion/>
    </div>
    </>

  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllCreditTransfers } from "@/api/CreditTransferAPI";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const CAMPUSES = useQuery({
    queryKey: ["campuses"],
    queryFn: () => getAllCreditTransfers(),
  });

  if (CAMPUSES.isPending || CAMPUSES.data === undefined) {
    return <div>Loading...</div>;
  } else if (CAMPUSES.isError) {
    return <div>Error: {CAMPUSES.error.message}</div>;
  } else {
    return (
      <div>
        <p>Liste des TC :</p>
        <ul>
          {CAMPUSES.data.map(
            (element: {
              id: number;
              university: string;
              country: string;
              startDate: string;
              endDate: string;
            }) => {
              return <li key={element.id}>{element.university}</li>;
            },
          )}
        </ul>
      </div>
    );
  }
}

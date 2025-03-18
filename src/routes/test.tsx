import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllCreditTransfers } from "@/api/CreditTransfersAPI";
import LoadingSpinner from "@/components/LoadingSpinner";
import BookingAnimation from "@/components/BookingAnimation";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

type BookingStatus = "loading" | "success" | "error";

function RouteComponent() {
  const CAMPUSES = useQuery({
    queryKey: ["campuses"],
    queryFn: () => getAllCreditTransfers(),
  });
  const [status, setStatus] = useState<BookingStatus | undefined>("loading");

  useEffect(() => {
    const timer1 = setTimeout(() => setStatus("success"), 2000);
    const timer2 = setTimeout(() => setStatus("loading"), 4000);
    const timer3 = setTimeout(() => setStatus("error"), 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

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
        <LoadingSpinner waitingText="Récupération des disponibilités" />
        <BookingAnimation status={status} />
      </div>
    );
  }
}

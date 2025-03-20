import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { verify } from "@/api/AuthAPI";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Page from "@/components/Page";

type VerificationTokenSearchParams = {
  token: string;
};

export const Route = createFileRoute("/verify-email")({
  component: RouteComponent,
  validateSearch: (
    search: Record<string, unknown>,
  ): VerificationTokenSearchParams => {
    return {
      token: search.token as string,
    };
  },
});

function RouteComponent() {
  const { token } = Route.useSearch();

  const mutation = useMutation({
    mutationFn: (token: string) => {
      return verify({ token });
    },
  });

  useEffect(() => {
    if (token) {
      mutation.mutate(token);
    }
  }, [token]);

  if (mutation.isPending) {
    return <LoadingSpinner waitingText="Vérification de votre compte" />;
  } else if (mutation.isError) {
    return <div>Une erreur est survenue : {mutation.error.message}</div>;
  } else {
    return (
      <Page className="flex flex-1 flex-col items-center justify-center">
        <p>Votre compte a bien été vérifié !</p>
        <Link to="/">
          <Button className="w-96 font-semibold text-black" type="submit">
            Connexion
          </Button>
        </Link>
      </Page>
    );
  }
}

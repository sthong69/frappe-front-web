import Page from "@/components/Page";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const PageNotFound = () => {
  return (
    <Page className="flex flex-1 flex-col">
      <div className="flex h-full w-full flex-grow items-center justify-center gap-8">
        <div className="mx-auto max-w-md space-y-8">
          <div className="relative mx-auto h-60 w-60">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[180px] font-bold text-muted-foreground/20">
                404
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">
              Page non trouvée
            </h1>
            <p className="text-center text-muted-foreground">
              Désolé, nous n'avons pas pu trouver la page que vous recherchez.
              Il se peut qu'elle ait été déplacée, supprimée ou qu'elle n'ait
              jamais existé.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Link to="/">
              <Button size="lg" className="gap-1 font-bold">
                <ArrowLeft className="h-4 w-4" />
                Revenir à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PageNotFound;

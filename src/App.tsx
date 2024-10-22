import { Button } from "./components/ui/button";

export default function App() {
  return (
    <div className="bg-student flex min-h-screen flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold text-red-500">Salut les bg</h1>
      <Button variant={"primary"} size={"lg"} className="text-3xl font-bold">
        PROJET FRONT
      </Button>
      <Button variant={"secondary"}>Secondaire</Button>
      <Button variant={"confirm"}>Confirmer</Button>
      <Button variant={"cancel"} size={"sm"}>
        Annuler
      </Button>
    </div>
  );
}

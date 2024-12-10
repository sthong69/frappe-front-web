import { FORMATIONS, TAFS } from "@/db/dummyData";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const RegisterForm = () => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4 border-b">
      <Input className="w-96 text-center" type="text" placeholder="Prénom" />
      <Input className="w-96 text-center" type="text" placeholder="Nom" />
      <Select>
        <SelectTrigger className="w-96 items-center justify-center gap-4">
          Formation
        </SelectTrigger>
        <SelectContent>
          {FORMATIONS.map((formation) => (
            <SelectItem value={formation}>{formation}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-96 items-center justify-center gap-4">
          TAF
        </SelectTrigger>
        <SelectContent>
          {TAFS.map((taf) => (
            <SelectItem value={taf}>{taf}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input className="w-96 text-center" type="email" placeholder="E-mail" />
      <Input
        className="w-96 text-center"
        type="password"
        placeholder="Mot de passe"
      />
      <Button className="w-96 font-semibold text-black" type="submit">
        S'inscrire
      </Button>
    </div>
  );
};

export default RegisterForm;

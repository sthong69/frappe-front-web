import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const LoginForm = () => {
  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4 border-b">
      <Input className="w-96 text-center" type="email" placeholder="E-mail" />
      <Input
        className="w-96 text-center"
        type="password"
        placeholder="Mot de passe"
      />
      <Button className="w-96 font-semibold text-black" type="submit">
        Connexion
      </Button>
      <Link className="text-sm" to="/recover-password">
        *MOT DE PASSE OUBLIÉ ?
      </Link>
    </div>
  );
};

export default LoginForm;

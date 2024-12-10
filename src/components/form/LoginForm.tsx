import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../PasswordInput";
import { useAuth } from "@/context/Auth";

const LoginForm = () => {
  const auth = useAuth();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    auth.login({ email: values.email, password: values.password });
  }

  return (
    <>
      <div className="flex flex-grow flex-col items-center justify-center gap-4 border-b p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput placeholder="Mot de passe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-96 font-semibold text-black" type="submit">
              Connexion
            </Button>
          </form>
        </Form>

        <Link className="text-sm" to="/recover-password">
          *MOT DE PASSE OUBLIÉ ?
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p>PAS ENCORE DE COMPTE ?</p>
        <Button className="w-96 font-semibold text-black">
          <Link to="/register">S'inscrire</Link>
        </Button>
      </div>
    </>
  );
};

export default LoginForm;

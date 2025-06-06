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
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/AuthAPI";
import { router } from "@/router";
import { useAuth } from "@/context/Auth";
import { AxiosError } from "axios";
import { useState } from "react";
import { handleError } from "@/lib/errors/utils";
import { LoginInput } from "@/lib/types/AuthTypes";

const LoginForm = () => {
  const authContext = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (userData: LoginInput) => {
      return login(userData);
    },
    onSuccess: async (data) => {
      authContext.storeAuthToken(data.token);
      authContext.storeUserRole(data.role);
      router.navigate({ to: "/dashboard" });
    },
    onError: (error: AxiosError) => {
      setIsLoading(false);
      setError(handleError(error));
    },
  });

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
    setError(null);
    setIsLoading(true);
    mutation.mutate(values);
  }

  return (
    <>
      <div className="flex flex-grow flex-col items-center justify-center gap-8 border-b p-4">
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
            <Button
              className="w-96 font-semibold text-black"
              type="submit"
              disabled={isLoading}
            >
              Connexion
            </Button>
          </form>
        </Form>
        {error && <p className="text-center text-red-500">{error}</p>}

        <Link className="text-sm" to="/recover-password">
          *MOT DE PASSE OUBLIÉ ?
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p>PAS ENCORE DE COMPTE ?</p>
        <Link to="/register">
          <Button
            className="w-96 font-semibold text-black"
            disabled={isLoading}
          >
            S'inscrire
          </Button>
        </Link>
      </div>
    </>
  );
};

export default LoginForm;

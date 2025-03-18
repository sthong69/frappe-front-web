import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordChecklist from "react-password-checklist";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { PasswordInput } from "@/components/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/AuthAPI";
import Page from "@/components/Page";
import { AxiosError } from "axios";
import { handleError } from "@/lib/errors/utils";

const RegisterForm = () => {
  const [registrationSuccess, setRegistrationSuccess] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (newUserData: {
      username: string;
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    }) => {
      return register(newUserData);
    },
    onSuccess: () => {
      setRegistrationSuccess(true);
    },
    onError: (error: AxiosError) => {
      setIsLoading(false);
      setError(handleError(error));
    },
  });

  const formSchema = z.object({
    lastName: z.string().max(128),
    firstName: z.string().max(128),
    email: z
      .string()
      .email()
      .refine((email) => email.endsWith("@imt-atlantique.net"), {
        message: "L'adresse e-mail doit être une adresse '@imt-atlantique.net'",
      }),
    createPassword: z.string().max(128),
    confirmPassword: z.string().max(128),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      createPassword: "",
      confirmPassword: "",
    },
  });
  const [password, setPassword] = useState(form.getValues("createPassword"));
  const [confirmPassword, setConfirmPassword] = useState(
    form.getValues("confirmPassword"),
  );
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // const specialCharacterRegex = /[~`¿¡!#$%\^&*€£@+÷=éÉèÈçÇàÀùÙ§\-\[\]\\';,/{}\(\)|\\":<>\?\.\_]/g;

  function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setIsLoading(true);
    if (isPasswordValid) {
      mutation.mutate({
        username: values.email,
        password: values.createPassword,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
      });
    } else if (password != confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Les mots de passe doivent correspondre",
      });
      setIsLoading(false);
    } else {
      form.setError("createPassword", {
        type: "manual",
        message: "Le mot de passe doit répondre aux critères de sécurité",
      });
      setIsLoading(false);
    }
  }

  if (registrationSuccess) {
    return (
      <Page className="text-center">
        Un e-mail de confirmation a été envoyé. Merci de valider votre compte !
      </Page>
    );
  }

  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="createPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="Mot de passe"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setPassword(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    placeholder="Confirmez le mot de passe"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setConfirmPassword(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <PasswordChecklist
            className="text-[14px]"
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            onChange={(isValid) => {
              setIsPasswordValid(isValid);
            }}
            minLength={8}
            maxLength={128}
            iconSize={10}
            value={password}
            valueAgain={confirmPassword}
            messages={{
              minLength: "Le mot de passe doit faire au minimum 8 caractères.",
              specialChar:
                "Le mot de passe doit contenir au moins un caractère spécial.",
              number: "Le mot de passe doit contenir au moins un chiffre.",
              capital: "Le mot de passe doit contenir au moins une majuscule.",
              match: "Les mots de passe doivent correspondre.",
            }}
          />
          <Button
            className="w-full font-semibold text-black"
            type="submit"
            disabled={isLoading}
          >
            S'inscrire
          </Button>
        </form>
      </Form>
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default RegisterForm;

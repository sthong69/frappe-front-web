import { Button } from "../ui/button";
import { Input } from "../ui/input";
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
} from "../ui/form";
import { toast } from "sonner";
import { useState } from "react";
import { PasswordInput } from "../PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/AuthAPI";

const RegisterForm = () => {
  const formSchema = z.object({
    lastName: z.string().max(128),
    firstName: z.string().max(128),
    email: z.string().email(),
    createPassword: z.string().max(128),
    confirmPassword: z.string().max(128),
  });

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
    if (isPasswordValid) {
      console.log(values);
      mutation.mutate({
        username: values.email,
        password: values.createPassword,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
      });
    } else {
      toast("Merci de fournir un mot de passe répondant aux critères.");
    }
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
          <Button className="w-96 font-semibold text-black" type="submit">
            S'inscrire
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;

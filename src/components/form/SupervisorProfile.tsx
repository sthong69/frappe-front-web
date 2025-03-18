import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Supervisor } from "@/lib/types/AuthTypes";
import { toast } from "sonner";
import { getAllCampuses } from "@/api/CampusAPI";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";
import { handleError } from "@/lib/errors/utils";
import { AxiosError } from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorkInProgress from "../WorkInProgress";
import { updateSupervisorInfo } from "@/api/SupervisorsAPI";
import { PasswordInput } from "../PasswordInput";
import { useAuth } from "@/context/Auth";

interface SupervisorProfileProps {
  supervisor: Supervisor;
  editable?: boolean;
}

const SupervisorProfile = ({
  supervisor,
  editable = false,
}: SupervisorProfileProps) => {
  const { fetchUserInfo } = useAuth();
  const CAMPUSES = useQuery({
    queryKey: ["campuses"],
    queryFn: getAllCampuses,
  });

  const mutation = useMutation({
    mutationFn: (newSupervisorInfos: Supervisor) => {
      return updateSupervisorInfo(newSupervisorInfos);
    },
    onSuccess: () => {
      fetchUserInfo();
      toast.success("Profil mis à jour avec succès");
    },
    onError: (error: AxiosError) => {
      console.log(handleError(error));
      toast.error(
        "Erreur lors de la mise à jour du profil  (" + handleError(error) + ")",
      );
    },
  });

  const zimbraMutation = useMutation({
    mutationFn: (newSupervisorInfos: Supervisor) => {
      return updateSupervisorInfo(newSupervisorInfos);
    },
    onSuccess: () => {
      toast.success("Informations Zimbra mises à jour avec succès");
    },
    onError: (error: AxiosError) => {
      console.log(handleError(error));
      toast.error(
        "Erreur lors de la mise à jour des informations Zimbra  (" +
          handleError(error) +
          ")",
      );
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
      })
      .or(z.string().length(0)),
    phoneNumber: z
      .string()
      .refine((phone) => phone === "" || isValidPhoneNumber(phone), {
        message: "Le numéro de téléphone est invalide",
      }),
    campusId: z.string(),
    meetingUrl: z.string(),
    changePassword: z.string().max(128).optional(),
    confirmPassword: z.string().max(128).optional(),
  });

  const formZimbraSchema = z.object({
    caldavUsername: z.string(),
    caldavPassword: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: supervisor?.lastName ?? "",
      firstName: supervisor?.firstName ?? "",
      email: supervisor?.email ?? "",
      phoneNumber: supervisor?.phoneNumber ?? "",
      campusId: supervisor?.campusId?.toString() ?? "",
      meetingUrl: supervisor?.meetingUrl ?? "",
      changePassword: "",
      confirmPassword: "",
    },
  });

  const zimbraForm = useForm<z.infer<typeof formZimbraSchema>>({
    resolver: zodResolver(formZimbraSchema),
    defaultValues: {
      caldavUsername: "",
      caldavPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (supervisor) {
      mutation.mutate({
        ...values,
        id: supervisor.id,
        username: supervisor.username,
        campusId: parseInt(values.campusId),
      });
    }
  }

  function onZimbraSubmit(values: z.infer<typeof formZimbraSchema>) {
    zimbraMutation.mutate({
      ...supervisor,
      ...values,
    });
  }

  if (CAMPUSES.isLoading) {
    return <></>;
  }

  if (CAMPUSES.isError || !CAMPUSES.data) {
    return (
      <div className="flex flex-col gap-8">
        <p>Les campus n'ont pas pu être récupérées depuis le serveur.</p>
        <p>{CAMPUSES.error?.message}</p>
      </div>
    );
  }

  return (
    <div className="-mt-8 flex flex-col items-center justify-center gap-4">
      <Card className="w-full shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary to-indigo-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {supervisor.firstName} {supervisor.lastName}
            </h1>
            <div className="flex flex-row gap-2">{/* Potential badges*/}</div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="flex w-full gap-8">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="zimbra-integration">
                Intégration Zimbra
              </TabsTrigger>
              {editable ? (
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              ) : (
                <></>
              )}
            </TabsList>
            <TabsContent value="general" className="w-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de famille</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={supervisor?.lastName ?? ""}
                            {...field}
                          />
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
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={supervisor?.firstName ?? ""}
                            {...field}
                          />
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
                        <FormLabel>Adresse e-mail</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={supervisor?.email ?? ""}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de téléphone</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder={
                              supervisor?.phoneNumber
                                ? supervisor.phoneNumber
                                : ""
                            }
                            {...field}
                            international
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="campusId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campus</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre campus actuel" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CAMPUSES.data.map((campus) => (
                              <SelectItem
                                key={campus.id}
                                value={campus.id.toString()}
                              >
                                {campus.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="mt-6 w-full font-semibold text-black"
                    disabled={mutation.isPending}
                  >
                    Sauvegarder
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent
              value="zimbra-integration"
              className="w-auto space-y-6"
            >
              <Form {...zimbraForm}>
                <form
                  onSubmit={zimbraForm.handleSubmit(onZimbraSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={zimbraForm.control}
                    name="caldavUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail Zimbra</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={"encadrant@imt-atlantique.net"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={zimbraForm.control}
                    name="caldavPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe Zimbra</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="Mot de passe"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="mt-6 w-full font-semibold text-black"
                    disabled={zimbraMutation.isPending}
                  >
                    Sauvegarder les informations Zimbra
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="security">
              <WorkInProgress />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorProfile;

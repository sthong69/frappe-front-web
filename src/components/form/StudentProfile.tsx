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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { updateStudentInfo } from "@/api/StudentsAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Student } from "@/lib/types/AuthTypes";
import { GENDERS } from "@/lib/consts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import { getAllCampuses } from "@/api/CampusAPI";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PhoneInput } from "@/components/ui/phone-input";
import { handleError } from "@/lib/errors/utils";
import { AxiosError } from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllCreditTransfers } from "@/api/CreditTransfersAPI";
import WorkInProgress from "../WorkInProgress";

interface StudentProfileProps {
  student: Student;
  editable?: boolean;
}

const StudentProfile = ({ student, editable = false }: StudentProfileProps) => {
  const CAMPUSES = useQuery({
    queryKey: ["campuses"],
    queryFn: getAllCampuses,
  });

  const CREDIT_TRANSFERS = useQuery({
    queryKey: ["credit-transfers"],
    queryFn: getAllCreditTransfers,
  });

  const mutation = useMutation({
    mutationFn: (newStudentInfos: Student) => {
      return updateStudentInfo(newStudentInfos);
    },
    onSuccess: () => {
      toast.success("Profil mis à jour avec succès");
    },
    onError: (error: AxiosError) => {
      console.log(handleError(error));
      toast.error(
        "Erreur lors de la mise à jour du profil  (" + handleError(error) + ")",
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
      }),
    phoneNumber: z.string().refine(isValidPhoneNumber, {
      message: "Le numéro de téléphone est invalide",
    }),
    campusId: z.string(),
    gender: z.string(),
    nationality: z.string(),
    creditTransferId: z.string(),
    changePassword: z.string().max(128).optional(),
    confirmPassword: z.string().max(128).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: student?.lastName ?? "",
      firstName: student?.firstName ?? "",
      email: student?.email ?? "",
      phoneNumber: student?.phoneNumber ?? "",
      campusId: student?.campusId?.toString() ?? "",
      gender: student?.gender ?? "",
      nationality: student?.nationality ?? "",
      creditTransferId: student?.creditTransferId?.toString() ?? "",
      changePassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (student) {
      mutation.mutate({
        ...values,
        id: student.id,
        username: student.username,
        campusId: parseInt(values.campusId),
        creditTransferId: parseInt(values.creditTransferId),
      });
    }
  }

  if (CAMPUSES.isLoading || CREDIT_TRANSFERS.isLoading) {
    return <></>;
  }

  if (
    CAMPUSES.isError ||
    !CAMPUSES.data ||
    CREDIT_TRANSFERS.isError ||
    !CREDIT_TRANSFERS.data
  ) {
    return (
      <div className="flex flex-col gap-8">
        <p>
          Les campus et la liste des transferts de crédit n'ont pas pu être
          récupérées depuis le serveur.
        </p>
        <p>
          {CAMPUSES.error?.message} {CREDIT_TRANSFERS.error?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="-mt-8 flex flex-col items-center justify-center gap-4">
      <Card className="w-full shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary to-indigo-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {student.firstName} {student.lastName}
            </h1>
            <div className="flex flex-row gap-2">
              {GENDERS.find((gender) => gender.value === student.gender) ? (
                <Badge variant="secondary" className="mt-2">
                  {
                    GENDERS.find((gender) => gender.value === student.gender)
                      ?.label
                  }
                </Badge>
              ) : (
                <></>
              )}
              <Badge variant="secondary" className="mt-2">
                FISE A3
              </Badge>
              <Badge variant="secondary" className="mt-2">
                ILSD
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="flex w-full gap-8">
                  <TabsTrigger value="general">Général</TabsTrigger>
                  <TabsTrigger value="credit-transfer">
                    Transfert de crédits
                  </TabsTrigger>
                  {editable ? (
                    <TabsTrigger value="security">Sécurité</TabsTrigger>
                  ) : (
                    <></>
                  )}
                </TabsList>
                <TabsContent value="general" className="w-auto space-y-6">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Genre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez votre genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GENDERS.map(
                              (gender: { label: string; value: string }) => {
                                return (
                                  <SelectItem
                                    key={gender.value}
                                    value={gender.value}
                                  >
                                    {gender.label}
                                  </SelectItem>
                                );
                              },
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom de famille</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={student?.lastName ?? ""}
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
                            placeholder={student?.firstName ?? ""}
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
                            placeholder={student?.email ?? ""}
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
                              student?.phoneNumber ? student.phoneNumber : ""
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
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Nationalité</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? COUNTRIES.find(
                                      (country) =>
                                        country.value === field.value,
                                    )?.label
                                  : "Sélectionnez votre nationalité"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-96 p-0">
                            <Command>
                              <CommandInput
                                placeholder="Rechercher un pays..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>
                                  Pas de pays correspondant.
                                </CommandEmpty>
                                <CommandGroup>
                                  {COUNTRIES.map((country) => (
                                    <CommandItem
                                      value={country.label}
                                      key={country.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "nationality",
                                          country.value,
                                        );
                                      }}
                                    >
                                      {country.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          country.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="credit-transfer">
                  <FormField
                    control={form.control}
                    name="creditTransferId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transfert de crédit</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une université partenaire" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CREDIT_TRANSFERS.data.map((creditTransfer) => (
                              <SelectItem
                                key={creditTransfer.id}
                                value={creditTransfer.id.toString()}
                              >
                                {creditTransfer.university}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="security">
                  <WorkInProgress />
                </TabsContent>
              </Tabs>
              {editable ? (
                <Button
                  type="submit"
                  className="mt-6 w-full font-semibold text-black"
                  disabled={mutation.isPending}
                >
                  Sauvegarder
                </Button>
              ) : (
                <></>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;

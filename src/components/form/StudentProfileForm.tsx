import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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
import { useAuth } from "@/context/Auth";
import { updateStudentInfo } from "@/api/StudentsAPI";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Student } from "@/lib/types/AuthTypes";
import { GENDERS } from "@/lib/consts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Check, Pencil, Save } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";
import { getAllCampuses } from "@/api/CampusAPI";
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StudentProfileForm = () => {
  const { user } = useAuth();
  const student = user as Student;

  const [isEditing, setIsEditing] = useState(false);

  const CAMPUSES = useQuery({
    queryKey: ["campuses"],
    queryFn: getAllCampuses,
  });

  const mutation = useMutation({
    mutationFn: (newStudentInfos: Student) => {
      return updateStudentInfo(newStudentInfos);
    },
    onSuccess: () => {
      toast.success("Profil mis à jour avec succès");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour du profil : " + error);
    },
  });

  const formSchema = z.object({
    lastName: z.string().max(128),
    firstName: z.string().max(128),
    email: z
      .string()
      .email()
      .refine((email) => email.endsWith("@imt-atlantique.net"), {
        message: "L'adresse e-mail doit être une adresse imt-atlantique.net",
      }),
    phoneNumber: z.string().min(10),
    campusId: z.string(),
    gender: z.string(),
    nationality: z.string(),
    creditTransferId: z.string(),
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

  if (CAMPUSES.isLoading) {
    return <></>;
  }

  if (CAMPUSES.isError || !CAMPUSES.data) {
    return (
      <div className="flex flex-col gap-8">
        <p>
          Les campus et la liste des encadrants TING n'ont pas pu être
          récupérées depuis le serveur.
        </p>
        <p>{CAMPUSES.error?.message}</p>
      </div>
    );
  }

  return (
    <div className="-mt-8 flex flex-col items-center justify-center gap-4">
      <Card className="w-full shadow-xl">
        <CardHeader className="bg-gradient-to-r from-primary to-indigo-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
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
            <Button
              variant="secondary"
              size="icon"
              onClick={() =>
                isEditing ? form.handleSubmit(onSubmit)() : setIsEditing(true)
              }
            >
              {isEditing ? (
                <Save className="h-4 w-4" />
              ) : (
                <Pencil className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="gender"
                disabled={!isEditing}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
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
                disabled={!isEditing}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de famille</FormLabel>
                    <FormControl>
                      <Input placeholder={student?.lastName ?? ""} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                disabled={!isEditing}
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
                disabled={!isEditing}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse e-mail</FormLabel>
                    <FormControl>
                      <Input placeholder={student?.email ?? ""} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                disabled={!isEditing}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de téléphone</FormLabel>
                    <FormControl>
                      <Input
                        type="phone"
                        placeholder={student?.phoneNumber ?? "06 12 34 56 78"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="campusId"
                disabled={!isEditing}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Campus</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
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
                disabled={!isEditing}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Nationalité</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild disabled={!isEditing}>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                            disabled={!isEditing}
                          >
                            {field.value
                              ? COUNTRIES.find(
                                  (country) => country.value === field.value,
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
                                    form.setValue("nationality", country.value);
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfileForm;

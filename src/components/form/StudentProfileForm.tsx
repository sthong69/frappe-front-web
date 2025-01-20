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
import { useMutation } from "@tanstack/react-query";
import { Student } from "@/lib/types/AuthTypes";
import { GENDERS } from "@/lib/consts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { COUNTRIES } from "@/lib/countries";

const CAMPUSES = [
  { id: 1, name: "Brest" },
  { id: 2, name: "Rennes" },
  { id: 3, name: "Nantes" },
];

const StudentProfileForm = () => {
  const { user } = useAuth();
  const student = user as Student;

  const mutation = useMutation({
    mutationFn: (newStudentInfos: Student) => {
      return updateStudentInfo(newStudentInfos);
    },
    onSuccess: () => {
      toast.success("Profil mis à jour avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour du profil : " + error);
    },
  });

  const formSchema = z.object({
    lastName: z.string().max(128),
    firstName: z.string().max(128),
    email: z.string().email(),
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

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    {GENDERS.map((gender: { label: string; value: string }) => {
                      return (
                        <SelectItem key={gender.value} value={gender.value}>
                          {gender.label}
                        </SelectItem>
                      );
                    })}
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
                  <Input placeholder={student?.lastName ?? ""} {...field} />
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
                  <Input placeholder={student?.firstName ?? ""} {...field} />
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
                  <Input placeholder={student?.email ?? ""} {...field} />
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
                    {CAMPUSES.map((campus) => (
                      <SelectItem key={campus.id} value={campus.id.toString()}>
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
                        <CommandEmpty>Pas de pays correspondant.</CommandEmpty>
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
          <Button className="w-96 font-semibold text-black" type="submit">
            Mettre à jour le profil
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentProfileForm;

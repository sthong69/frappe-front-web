import { cn, formatDateToFrench } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { getHours, getMinutes } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useState } from "react";
import { INTERNSHIP_DURATIONS, MEETING_THEMES } from "@/lib/consts";
import { Textarea } from "../../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { COUNTRIES } from "@/lib/countries";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { Check } from "lucide-react";
import { useAuth } from "@/context/Auth";
import { requestAMeeting } from "@/api/MeetingRequestsAPI";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface ChooseMeetingTypeProps {
  meetingInfos: {
    campusInfos: {
      id: number;
      name: string;
    };
    supervisorInfos: {
      id: number;
      firstName: string;
      lastName: string;
    };
    startDate: Date;
    endDate: Date;
    duration: string;
    theme: string | undefined;
    request_description: string | undefined;
    internship_duration: string | undefined;
    wanted_country: string | undefined;
  };
  setMeetingInfos: React.Dispatch<
    React.SetStateAction<
      | {
          campusInfos: {
            id: number;
            name: string;
          };
          supervisorInfos: {
            id: number;
            firstName: string;
            lastName: string;
          };
          duration: string;
          startDate: Date | undefined;
          endDate: Date | undefined;
          theme: string | undefined;
          request_description: string | undefined;
          internship_duration: string | undefined;
          wanted_country: string | undefined;
        }
      | undefined
    >
  >;
}

const ChooseMeetingType = (props: ChooseMeetingTypeProps) => {
  const [theme, setTheme] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: (meetingInfos: {
      campusInfos: { id: number; name: string };
      supervisorInfos: { id: number; firstName: string; lastName: string };
      studentId: number;
      startDate: Date;
      endDate: Date;
      theme: string;
      request_description: string;
      internship_duration: string | undefined;
      wanted_country: string | undefined;
      duration: string;
    }) => {
      return requestAMeeting(meetingInfos);
    },
    onSuccess: () => {
      toast.success("Rendez-vous proposé avec succès !");
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error("Erreur lors de la demande de rendez-vous : " + error);
    },
  });

  const formSchema = z.object({
    theme: z.string(),
    request_description: z.string(),
    internship_duration: z.string(),
    wanted_country: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "",
      request_description: "",
      internship_duration: "",
      wanted_country: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.theme) {
      form.setError("theme", {
        message: "Veuillez sélectionner un motif.",
      });
    }
    if (!values.request_description) {
      form.setError("request_description", {
        message: "Veuillez renseigner un commentaire.",
      });
    }
    if (theme?.value == "Internship request" && !values.wanted_country) {
      form.setError("wanted_country", {
        message: "Veuillez sélectionner un pays envisagé pour votre stage.",
      });
    }
    if (theme?.value == "Internship request" && !values.internship_duration) {
      form.setError("internship_duration", {
        message: "Veuillez sélectionner une durée de stage.",
      });
    }
    if (
      !values.theme ||
      !values.request_description ||
      (theme?.value === "Internship request" &&
        (!values.wanted_country || !values.internship_duration))
    ) {
      return;
    }
    if (editMode) {
      setEditMode(false);
      return;
    }
    setIsLoading(true);
    mutation.mutate({ ...props.meetingInfos, ...values, studentId: user?.id! });
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <p className="-mt-4 mb-4 px-4">
        Veuillez renseigner les informations complémentaires.
      </p>
      <div className="grid h-full flex-1 grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="w-64 rounded-lg bg-white p-2 text-center">
            {props.meetingInfos.campusInfos.name}
          </div>
          <div className="w-64 rounded-lg bg-white p-2 text-center">
            {props.meetingInfos.supervisorInfos.firstName}{" "}
            {props.meetingInfos.supervisorInfos.lastName}
          </div>
          <div className="w-64 rounded-lg bg-white p-2 text-center">
            {`${getHours(props.meetingInfos.startDate)}:${getMinutes(props.meetingInfos.startDate).toString().padEnd(2, "0")} - ${getHours(props.meetingInfos.endDate)}:${getMinutes(props.meetingInfos.endDate).toString().padEnd(2, "0")}`}
          </div>
          <div className="w-64 rounded-lg bg-white p-2 text-center">
            {formatDateToFrench(props.meetingInfos.startDate)}
          </div>
          <Button
            className="w-64 font-semibold text-black"
            variant={"default"}
            disabled={isLoading}
            onClick={() =>
              props.setMeetingInfos({
                ...props.meetingInfos,
                startDate: undefined,
                endDate: undefined,
              })
            }
          >
            Modifier la date et l'heure
          </Button>
        </div>
        <div className="col-span-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex h-full flex-1 flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      disabled={!editMode}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setTheme(
                          MEETING_THEMES.find((theme) => theme.value === value),
                        );
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-96">
                          <SelectValue placeholder="Motif" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MEETING_THEMES.map((theme) => (
                          <SelectItem key={theme.value} value={theme.value}>
                            {theme.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {theme && theme.value == "Internship request" ? (
                <>
                  <FormField
                    control={form.control}
                    name="wanted_country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Pays envisagé pour le stage</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled={!editMode}
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
                                  : "Sélectionnez un pays"}
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
                                          "wanted_country",
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
                  <FormField
                    control={form.control}
                    name="internship_duration"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!editMode}
                        >
                          <FormControl>
                            <SelectTrigger className="w-96">
                              <SelectValue placeholder="Durée du stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {INTERNSHIP_DURATIONS.map((duration) => (
                              <SelectItem
                                key={duration.value}
                                value={duration.value}
                              >
                                {duration.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <></>
              )}
              <FormField
                control={form.control}
                name="request_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commentaire</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={!editMode}
                        {...field}
                        placeholder="Merci de décrire au mieux le sujet de votre rendez-vous afin que les encadrants TING puissent vous aider au mieux."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="ml-auto mt-auto flex flex-row gap-8">
                {editMode ? (
                  <></>
                ) : (
                  <Button
                    className="w-48 font-semibold text-black"
                    variant={"default"}
                    disabled={isLoading}
                    onClick={() => setEditMode(true)}
                  >
                    Modifier
                  </Button>
                )}

                <Button
                  className="w-48 font-semibold text-black"
                  variant={"destructive"}
                  disabled={isLoading}
                  onClick={() => props.setMeetingInfos(undefined)}
                >
                  Annuler
                </Button>
                <Button
                  className="w-48 font-semibold text-black"
                  type="submit"
                  disabled={isLoading}
                  variant={editMode ? "default" : "confirm"}
                >
                  {editMode ? "Continuer" : "Confirmer"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChooseMeetingType;

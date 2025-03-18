import type React from "react";

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
import BookingAnimation from "@/components/BookingAnimation";
import { router } from "@/router";

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
  const [booking, setIsBooking] = useState<boolean>(false);
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
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
      setStatus("success");
    },
    onError: (error) => {
      setStatus("error");
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
    setIsBooking(true);
    mutation.mutate({ ...props.meetingInfos, ...values, studentId: user?.id! });
  }
  if (booking) {
    return (
      <BookingAnimation
        status={status}
        onReset={() => {
          if (status === "success") {
            router.navigate({ to: "/" });
            return;
          }
          if (status === "error") {
            setStatus("loading");
            setIsBooking(false);
          }
        }}
      />
    );
  }
  return (
    <div className="flex flex-1 flex-col gap-4">
      <p className="-mt-4 mb-4 px-4 text-sm md:text-base">
        Veuillez renseigner les informations complémentaires.
      </p>
      <div className="grid h-full flex-1 grid-cols-1 gap-6 px-4 md:grid-cols-3 md:gap-0">
        {/* Meeting details - full width on mobile, 1/3 width on desktop */}
        <div className="flex flex-col gap-4">
          <div className="w-full rounded-lg bg-white p-2 text-center text-sm md:w-64 md:text-base">
            {props.meetingInfos.campusInfos.name}
          </div>
          <div className="w-full rounded-lg bg-white p-2 text-center text-sm md:w-64 md:text-base">
            {props.meetingInfos.supervisorInfos.firstName}{" "}
            {props.meetingInfos.supervisorInfos.lastName}
          </div>
          <div className="w-full rounded-lg bg-white p-2 text-center text-sm md:w-64 md:text-base">
            {`${getHours(props.meetingInfos.startDate)}:${getMinutes(props.meetingInfos.startDate).toString().padStart(2, "0")} - ${getHours(props.meetingInfos.endDate)}:${getMinutes(props.meetingInfos.endDate).toString().padStart(2, "0")}`}
          </div>
          <div className="w-full rounded-lg bg-white p-2 text-center text-sm md:w-64 md:text-base">
            {formatDateToFrench(props.meetingInfos.startDate)}
          </div>
          <Button
            className="w-full font-semibold text-black md:w-64"
            variant={"default"}
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

        {/* Form - full width on mobile, 2/3 width on desktop */}
        <div className="md:col-span-2">
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
                        <SelectTrigger className="w-full md:w-96">
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
                                  "w-full justify-between md:w-96",
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
                          <PopoverContent className="w-full p-0 md:w-96">
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
                            <SelectTrigger className="w-full md:w-96">
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
                        className="min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-auto flex flex-col gap-2 sm:ml-auto sm:flex-row sm:gap-8">
                {editMode ? (
                  <></>
                ) : (
                  <Button
                    className="w-full font-semibold text-black sm:w-auto md:w-48"
                    variant={"default"}
                    onClick={() => setEditMode(true)}
                  >
                    Modifier
                  </Button>
                )}

                <Button
                  className="w-full font-semibold text-black sm:w-auto md:w-48"
                  variant={"destructive"}
                  onClick={() => props.setMeetingInfos(undefined)}
                >
                  Annuler
                </Button>
                <Button
                  className="w-full font-semibold text-black sm:w-auto md:w-48"
                  type="submit"
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

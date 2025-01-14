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
} from "./ui/form";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { MEETING_THEMES } from "@/lib/consts";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { COUNTRIES } from "@/lib/countries";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Check } from "lucide-react";
import { getAllCitiesPerCountryName } from "@/api/CitiesAPI";

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
  };
}

const ChooseMeetingType = (props: ChooseMeetingTypeProps) => {
  const [theme, setTheme] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [country, setCountry] = useState<
    { label: string; value: string } | undefined
  >(undefined);
  const [cities, setCities] = useState<string[]>([]);
  const [city, setCity] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchCities = async () => {
      if (country) {
        const citiesData = await getAllCitiesPerCountryName(country.value);
        setCities(citiesData);
      }
    };
    fetchCities();
  }, [country]);

  const formSchema = z.object({
    theme: z.string(),
    request_description: z.string(),
    internship_duration: z.string(),
    wanted_city: z.string(),
    wanted_country: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "",
      request_description: "",
      internship_duration: "",
      wanted_city: "",
      wanted_country: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="-mt-4 mb-4 px-4">
        Veuillez renseigner les informations complémentaires.
      </p>
      <div className="flex flex-row gap-16">
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
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <Select
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
                                      setCountry(country);
                                      form.setValue("wanted_city", "");
                                      setCity(undefined);
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
                  name="wanted_city"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ville envisagée pour le stage</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={!country}
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {city ? field.value : "Sélectionnez un pays"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-96 p-0">
                          <Command>
                            <CommandInput
                              placeholder="Rechercher une ville..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>
                                Pas de ville correspondante dans le pays
                                spécifié.
                              </CommandEmpty>
                              <CommandGroup>
                                {country ? (
                                  cities.map((city) => (
                                    <CommandItem
                                      value={city}
                                      key={city}
                                      onSelect={() => {
                                        form.setValue("wanted_city", city);
                                        setCity(city);
                                      }}
                                    >
                                      {city}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          city === field.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                    </CommandItem>
                                  ))
                                ) : (
                                  <></>
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
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
                      {...field}
                      placeholder="Merci de décrire au mieux le sujet de votre rendez-vous afin que les encadrants TING puissent vous aider au mieux."
                      className="w-[50svw]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="ml-auto w-96 font-semibold text-black"
              type="submit"
            >
              Continuer
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChooseMeetingType;

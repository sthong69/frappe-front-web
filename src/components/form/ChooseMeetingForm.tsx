import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import ChooseDayAndTime from "../ChooseDayAndTime";
import { getAllSupervisors } from "@/api/SupervisorsAPI";
import { useQuery } from "@tanstack/react-query";
import { getAllCampuses } from "@/api/CampusAPI";
import { filterSupervisorsPerCampusId } from "@/lib/utils";

const DURATIONS = [
  { value: "30m", label: "30 minutes" },
  { value: "60m", label: "1 heure" },
];

const ChooseMeetingForm = () => {
  const [meetingInfos, setMeetingInfos] = useState<{
    campusInfos: { id: number; name: string };
    supervisorInfos: { id: number; firstName: string; lastName: string };
    duration: string;
  } | null>(null);
  const [campusId, setCampusId] = useState<string | null>(null);

  const CAMPUSES = useQuery({
    queryKey: ["campuses"],
    queryFn: getAllCampuses,
  });
  const SUPERVISORS = useQuery({
    queryKey: ["supervisors"],
    queryFn: getAllSupervisors,
  });

  const formSchema = z.object({
    campusId: z.string(),
    supervisorId: z.string(),
    duration: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campusId: "",
      supervisorId: "",
      duration: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.campusId == "") {
      toast.error("Veuillez sélectionner un campus");
      return;
    }
    if (values.supervisorId == "") {
      toast.error("Veuillez sélectionner un encadrant");
      return;
    }
    if (values.duration == "") {
      toast.error("Veuillez sélectionner une durée pour le rendez-vous");
      return;
    }
    console.log(values);
    const supervisor = SUPERVISORS.data!.find(
      (supervisor) => supervisor.id == parseInt(values.supervisorId),
    );
    const campus = CAMPUSES.data!.find(
      (campus) => campus.id == parseInt(values.campusId),
    );
    if (!supervisor) {
      toast.error("L'encadrant sélectionné n'existe pas");
      return;
    }
    if (!campus) {
      toast.error("Le campus sélectionné n'existe pas");
      return;
    }
    setMeetingInfos({
      ...values,
      supervisorInfos: supervisor,
      campusInfos: campus,
    });
  }

  if (CAMPUSES.isLoading || SUPERVISORS.isLoading) {
    return <></>;
  }

  if (
    CAMPUSES.isError ||
    SUPERVISORS.isError ||
    !CAMPUSES.data ||
    !SUPERVISORS.data
  ) {
    return (
      <div className="flex flex-col gap-8">
        <p>
          Les campus et la liste des encadrants TING n'ont pas pu être
          récupérées depuis le serveur.
        </p>
        <p>{CAMPUSES.error?.message ?? SUPERVISORS.error?.message}</p>
      </div>
    );
  }

  if (meetingInfos) {
    return (
      <ChooseDayAndTime
        meetingInfos={meetingInfos}
        setMeetingInfos={setMeetingInfos}
      />
    );
  }

  return (
    <>
      <p className="-mt-4 mb-4 px-4">
        Veuillez sélectionner le campus, l’encadrante TING et la durée estimée
        du rendez-vous.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col items-center justify-center space-y-6"
        >
          <FormField
            control={form.control}
            name="campusId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setCampusId(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-96">
                      <SelectValue placeholder="Campus" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CAMPUSES.data.map((campus) => (
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
            name="supervisorId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={!campusId} className="w-96">
                      <SelectValue placeholder="Encadrante" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filterSupervisorsPerCampusId(
                      SUPERVISORS.data,
                      parseInt(campusId!),
                    ).map((supervisor) => (
                      <SelectItem
                        key={supervisor.id}
                        value={supervisor.id.toString()}
                      >
                        {supervisor.firstName} {supervisor.lastName}
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
            name="duration"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-96">
                      <SelectValue placeholder="Durée" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DURATIONS.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="absolute bottom-10 right-10 w-96 font-semibold text-black"
            type="submit"
          >
            Continuer
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ChooseMeetingForm;

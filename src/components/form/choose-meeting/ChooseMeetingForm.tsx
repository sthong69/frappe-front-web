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
} from "@/components/ui/form";
import { toast } from "sonner";
import ChooseDayAndTime from "@/components/form/choose-meeting/ChooseDayAndTime";
import { getAllSupervisors } from "@/api/SupervisorsAPI";
import { useQuery } from "@tanstack/react-query";
import { getAllCampuses } from "@/api/CampusAPI";
import { filterSupervisorsPerCampusId } from "@/lib/utils";
import ChooseMeetingType from "@/components/form/choose-meeting/ChooseMeetingType";
import { MEETING_DURATIONS } from "@/lib/consts";

const ChooseMeetingForm = () => {
  const [meetingInfos, setMeetingInfos] = useState<
    | {
        campusInfos: { id: number; name: string };
        supervisorInfos: { id: number; firstName: string; lastName: string };
        startDate: Date | undefined;
        endDate: Date | undefined;
        theme: string | undefined;
        request_description: string | undefined;
        internship_duration: string | undefined;
        wanted_country: string | undefined;
        duration: string;
      }
    | undefined
  >(undefined);
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
      startDate: undefined,
      endDate: undefined,
      theme: undefined,
      request_description: undefined,
      internship_duration: undefined,
      wanted_country: undefined,
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

  if (!meetingInfos) {
    return (
      <>
        <p className="-mt-4 mb-4 px-4">
          Veuillez sélectionner le campus, l’encadrante TING et la durée estimée
          du rendez-vous.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-1 flex-col items-center gap-4"
          >
            <div className="my-auto flex flex-col gap-4">
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
                        {MEETING_DURATIONS.map((duration) => (
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
            </div>
            <Button
              className="ml-auto mt-auto w-96 font-semibold text-black"
              type="submit"
            >
              Continuer
            </Button>
          </form>
        </Form>
      </>
    );
  }

  if (!meetingInfos.startDate && !meetingInfos.endDate) {
    return (
      <ChooseDayAndTime
        meetingInfos={meetingInfos}
        setMeetingInfos={setMeetingInfos}
      />
    );
  }

  if (meetingInfos.startDate && meetingInfos.endDate) {
    return (
      <ChooseMeetingType
        meetingInfos={{
          ...meetingInfos,
          startDate: meetingInfos.startDate,
          endDate: meetingInfos.endDate,
        }}
        setMeetingInfos={setMeetingInfos}
      />
    );
  }
};

export default ChooseMeetingForm;

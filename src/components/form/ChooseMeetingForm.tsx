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
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { toast } from "sonner";
import ChooseDayAndTime from "../ChooseDayAndTime";

const CAMPUSES = [
  { id: 1, name: "Brest" },
  { id: 2, name: "Rennes" },
  { id: 3, name: "Nantes" },
];

const DURATIONS = [
  { value: "30m", label: "30 minutes" },
  { value: "60m", label: "1 heure" },
];

const SUPERVISORS_BREST = [
  { id: 1, firstName: "Encadrant", lastName: "Brest 1" },
  { id: 2, firstName: "Encadrant", lastName: "Brest 2" },
  { id: 3, firstName: "Encadrant", lastName: "Brest 3" },
];

const SUPERVISORS_NANTES = [
  { id: 4, firstName: "Encadrant", lastName: "Nantes 1" },
  { id: 5, firstName: "Encadrant", lastName: "Nantes 2" },
  { id: 6, firstName: "Encadrant", lastName: "Nantes 3" },
];

const SUPERVISORS_RENNES = [
  { id: 7, firstName: "Encadrant", lastName: "Rennes 1" },
  { id: 8, firstName: "Encadrant", lastName: "Rennes 2" },
  { id: 9, firstName: "Encadrant", lastName: "Rennes 3" },
];

const ChooseMeetingForm = () => {
  const [meetingInfos, setMeetingInfos] = useState<{
    campusId: string;
    supervisorId: string;
    duration: string;
  } | null>(null);
  const [campusId, setCampusId] = useState<string | null>(null);
  const [supervisors, setSupervisors] = useState<
    {
      id: number;
      firstName: string;
      lastName: string;
    }[]
  >([]);

  useEffect(() => {
    if (!campusId) {
      return;
    }
    if (campusId == "1") {
      setSupervisors(SUPERVISORS_BREST);
    } else if (campusId == "3") {
      setSupervisors(SUPERVISORS_NANTES);
    } else {
      setSupervisors(SUPERVISORS_RENNES);
    }
  }, [campusId]);

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
    setMeetingInfos(values);
  }

  if (meetingInfos) {
    return (
      <ChooseDayAndTime
        meetingInfos={meetingInfos}
        setMeetingInfos={setMeetingInfos}
        campus_label={
          CAMPUSES.find((campus) => campus.id.toString() == campusId)?.name ||
          ""
        }
        supervisor_firstname={
          supervisors.find(
            (supervisor) =>
              supervisor.id == parseInt(meetingInfos.supervisorId),
          )?.firstName ?? ""
        }
        supervisor_lastname={
          supervisors.find(
            (supervisor) =>
              supervisor.id == parseInt(meetingInfos.supervisorId),
          )?.lastName ?? ""
        }
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
                    {supervisors.map((supervisor) => (
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

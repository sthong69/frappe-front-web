import { Button } from "@/components/ui/button";
import { Calendar } from "react-calendar";
import "@/lib/styles/Calendar.css";
import { useQuery } from "@tanstack/react-query";
import { getAvailableDays } from "@/api/AvailabilitiesAPI";
import { addDays, isSameDay, setHours, setMinutes } from "date-fns";
import { useState } from "react";
import ChooseTime from "./ChooseTime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { formatDateToFrench } from "@/lib/utils";
import { DAYS_RANGE_FOR_MEETING } from "@/lib/consts";
import { toast } from "sonner";
import LoadingSpinner from "./LoadingSpinner";

interface ChooseDayAndTimeProps {
  meetingInfos: {
    campusInfos: { id: number; name: string };
    supervisorInfos: { id: number; firstName: string; lastName: string };
    duration: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
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
        }
      | undefined
    >
  >;
}

const ChooseDayAndTime = (props: ChooseDayAndTimeProps) => {
  const [input, setInput] = useState<{
    selectedDate: Date | undefined;
    startHours: number | undefined;
    startMinutes: number | undefined;
    endHours: number | undefined;
    endMinutes: number | undefined;
  }>({
    selectedDate: undefined,
    startHours: undefined,
    startMinutes: undefined,
    endHours: undefined,
    endMinutes: undefined,
  });

  const AVAILABLE_DAYS = useQuery({
    queryKey: ["availableDays", props.meetingInfos],
    queryFn: () =>
      getAvailableDays({
        ...props.meetingInfos,
        supervisorId: props.meetingInfos.supervisorInfos.id,
        startDate: new Date(),
        endDate: addDays(new Date(), DAYS_RANGE_FOR_MEETING),
      }),
  });

  const checkDay = ({
    date,
  }: {
    activeStartDate: Date;
    date: Date;
    view: any;
  }) => {
    let res = true;
    if (!AVAILABLE_DAYS.data) {
      return res;
    }
    for (let i = 0; i < AVAILABLE_DAYS.data.length; i++) {
      if (isSameDay(date, AVAILABLE_DAYS.data[i])) {
        res = false;
      }
    }
    return res;
  };

  if (!props.meetingInfos) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <p className="-mt-4 mb-4 px-4">
        Veuillez choisir le jour et l’heure du rendez-vous.
      </p>
      <div className="flex flex-row justify-center gap-8">
        <div className="w-64 rounded-lg bg-white p-2 text-center">
          {props.meetingInfos.campusInfos.name}
        </div>
        <div className="w-64 rounded-lg bg-white p-2 text-center">
          {props.meetingInfos.supervisorInfos.firstName}{" "}
          {props.meetingInfos.supervisorInfos.lastName}
        </div>
        <div className="w-64 rounded-lg bg-white p-2 text-center">
          {props.meetingInfos.duration == "30m" ? "30 minutes" : "1 heure"}
        </div>
        <Button
          className="w-64 font-semibold text-black"
          onClick={() => {
            props.setMeetingInfos(undefined);
          }}
        >
          Modifier
        </Button>
      </div>
      <Tabs defaultValue="date" className="px-16 py-8">
        <TabsList className="w-full justify-evenly">
          <TabsTrigger value="date" className="w-full">
            {AVAILABLE_DAYS.isLoading
              ? "Récupération des disponibilités..."
              : input.selectedDate == null
                ? "Veuilez sélectionner une date"
                : formatDateToFrench(input.selectedDate)}
          </TabsTrigger>
          <TabsTrigger
            value="time"
            className="w-full"
            disabled={input.selectedDate == null}
          >
            {input.startHours == undefined ||
            input.startMinutes == undefined ||
            input.endHours == undefined ||
            input.endMinutes == undefined
              ? "Horaire"
              : `${input.startHours.toString()}:${input.startMinutes
                  .toString()
                  .padEnd(
                    2,
                    "0",
                  )} - ${input.endHours.toString()}:${input.endMinutes.toString().padEnd(2, "0")}`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="date">
          <div className="flex justify-center pt-2">
            {AVAILABLE_DAYS.isLoading ? (
              <LoadingSpinner waitingText="Récupération des disponibilités" />
            ) : (
              <Calendar
                locale="fr"
                minDate={new Date()}
                maxDate={addDays(new Date(), DAYS_RANGE_FOR_MEETING)}
                defaultView="month"
                defaultValue={input.selectedDate}
                tileDisabled={checkDay}
                onClickDay={(date) => {
                  setInput({
                    selectedDate: date,
                    startHours: undefined,
                    startMinutes: undefined,
                    endHours: undefined,
                    endMinutes: undefined,
                  });
                }}
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="time">
          {input.selectedDate != null ? (
            <ChooseTime
              meetingInfos={{
                supervisorId: props.meetingInfos.supervisorInfos.id,
                ...props.meetingInfos,
              }}
              input={{ ...input, selectedDate: input.selectedDate }}
              setInput={setInput}
            />
          ) : (
            <></>
          )}
        </TabsContent>
      </Tabs>
      <Button
        className="ml-auto mt-auto w-96 font-semibold text-black"
        onClick={() => {
          if (input.selectedDate == undefined) {
            toast.error("Veuillez sélectionner une date pour le rendez-vous.");
            return;
          }
          if (
            input.startHours == undefined ||
            input.startMinutes == undefined ||
            input.endHours == undefined ||
            input.endMinutes == undefined
          ) {
            toast.error(
              "Veuillez sélectionner un créneau pour le rendez-vous.",
            );
            return;
          }
          props.setMeetingInfos({
            ...props.meetingInfos,
            startDate: setHours(
              setMinutes(input.selectedDate, input.startMinutes),
              input.startHours,
            ),
            endDate: setHours(
              setMinutes(input.selectedDate, input.endMinutes),
              input.endHours,
            ),
          });
        }}
      >
        Valider
      </Button>
    </div>
  );
};

export default ChooseDayAndTime;

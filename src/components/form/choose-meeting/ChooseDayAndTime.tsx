import type React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "react-calendar";
import "@/lib/styles/Calendar.css";
import { useQuery } from "@tanstack/react-query";
import { getAvailableDays } from "@/api/AvailabilitiesAPI";
import { addDays, isSameDay, setHours, setMinutes } from "date-fns";
import { useState } from "react";
import ChooseTime from "../../ChooseTime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { formatDateToFrench } from "@/lib/utils";
import { DAYS_RANGE_FOR_MEETING } from "@/lib/consts";
import { toast } from "sonner";
import LoadingSpinner from "../../LoadingSpinner";

interface ChooseDayAndTimeProps {
  meetingInfos: {
    campusInfos: { id: number; name: string };
    supervisorInfos: { id: number; firstName: string; lastName: string };
    duration: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
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
      <p className="-mt-4 mb-4 px-4 text-sm md:text-base">
        Veuillez choisir le jour et l'heure du rendez-vous.
      </p>

      {/* Meeting info summary - stacks on mobile */}
      <div className="flex flex-col flex-wrap justify-center gap-2 px-4 sm:flex-row sm:gap-4 md:gap-8">
        <div className="w-full rounded-lg bg-white p-2 text-center text-sm sm:w-auto md:text-base">
          {props.meetingInfos.campusInfos.name}
        </div>
        <div className="w-full rounded-lg bg-white p-2 text-center text-sm sm:w-auto md:text-base">
          {props.meetingInfos.supervisorInfos.firstName}{" "}
          {props.meetingInfos.supervisorInfos.lastName}
        </div>
        <div className="w-full rounded-lg bg-white p-2 text-center text-sm sm:w-auto md:text-base">
          {props.meetingInfos.duration == "30m" ? "30 minutes" : "1 heure"}
        </div>
        <Button
          className="mt-2 w-full font-semibold text-black sm:mt-0 sm:w-auto"
          onClick={() => {
            props.setMeetingInfos(undefined);
          }}
        >
          Modifier
        </Button>
      </div>

      {/* Calendar and time selection tabs */}
      <Tabs defaultValue="date" className="px-2 py-4 sm:px-8 sm:py-8 md:px-16">
        <TabsList className="w-full justify-evenly">
          <TabsTrigger value="date" className="w-full text-xs sm:text-sm">
            {AVAILABLE_DAYS.isLoading
              ? "Récupération des disponibilités..."
              : input.selectedDate == null
                ? "Veuilez sélectionner une date"
                : formatDateToFrench(input.selectedDate)}
          </TabsTrigger>
          <TabsTrigger
            value="time"
            className="w-full text-xs sm:text-sm"
            disabled={input.selectedDate == null}
          >
            {input.startHours == undefined ||
            input.startMinutes == undefined ||
            input.endHours == undefined ||
            input.endMinutes == undefined
              ? "Horaire"
              : `${input.startHours.toString()}:${input.startMinutes
                  .toString()
                  .padStart(
                    2,
                    "0",
                  )} - ${input.endHours.toString()}:${input.endMinutes.toString().padStart(2, "0")}`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="date">
          <div className="flex justify-center overflow-x-auto pt-2">
            {AVAILABLE_DAYS.isLoading ? (
              <LoadingSpinner waitingText="Récupération des disponibilités" />
            ) : (
              <div className="calendar-container max-w-full overflow-x-auto">
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
                  className="responsive-calendar"
                />
              </div>
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

      {/* Action buttons */}
      <div className="mt-auto flex flex-col gap-2 px-4 pb-4 sm:ml-auto sm:flex-row sm:gap-8">
        <Button
          className="w-full font-semibold text-black sm:w-auto md:w-48"
          variant={"destructive"}
          onClick={() => props.setMeetingInfos(undefined)}
        >
          Annuler
        </Button>
        <Button
          className="w-full font-semibold text-black sm:w-auto md:w-48"
          onClick={() => {
            if (input.selectedDate == undefined) {
              toast.error(
                "Veuillez sélectionner une date pour le rendez-vous.",
              );
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
    </div>
  );
};

export default ChooseDayAndTime;

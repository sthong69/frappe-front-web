import { Button } from "@/components/ui/button";
import { Calendar } from "react-calendar";
import "@/lib/styles/Calendar.css";
import { useQuery } from "@tanstack/react-query";
import { getAvailableDays } from "@/api/AvailabilitiesAPI";
import { addDays, isSameDay } from "date-fns";
import { useState } from "react";
import ChooseTime from "./ChooseTime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ChooseDayAndTimeProps {
  meetingInfos: {
    campusId: string;
    supervisorId: string;
    duration: string;
  };
  setMeetingInfos: React.Dispatch<
    React.SetStateAction<{
      campusId: string;
      supervisorId: string;
      duration: string;
    } | null>
  >;
  campus_label: string;
  supervisor_firstname: string;
  supervisor_lastname: string;
}

const ChooseDayAndTime = (props: ChooseDayAndTimeProps) => {
  const [input, setInput] = useState<{
    selectedDate: Date | null;
    hours: number | null;
    minutes: number | null;
  }>({ selectedDate: null, hours: null, minutes: null });

  const AVAILABLE_DAYS = useQuery({
    queryKey: ["availableDays", props.meetingInfos],
    queryFn: () =>
      getAvailableDays({
        ...props.meetingInfos,
        supervisorId: parseInt(props.meetingInfos.supervisorId),
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
    <div className="flex flex-col gap-4">
      <p className="-mt-4 mb-4 px-4">
        Veuillez choisir le jour et l’heure du rendez-vous.
      </p>
      <div className="flex flex-row justify-center gap-8">
        <div className="w-64 rounded-lg bg-white p-2 text-center">
          {props.campus_label}
        </div>
        <div className="w-64 rounded-lg bg-white p-2 text-center">
          {props.supervisor_firstname} {props.supervisor_lastname}
        </div>
        <div className="w-64 rounded-lg bg-white p-2 text-center">
          {props.meetingInfos.duration == "30m" ? "30 minutes" : "1 heure"}
        </div>
        <Button
          className="w-64 font-semibold text-black"
          onClick={() => {
            props.setMeetingInfos(null);
          }}
        >
          Modifier
        </Button>
      </div>
      <Tabs defaultValue="nbPersonnes" className="pb-8">
        <TabsList className="w-full justify-evenly">
          <TabsTrigger value="date" className="w-full">
            {input.selectedDate == null
              ? "Date"
              : input.selectedDate.toLocaleDateString()}
          </TabsTrigger>
          <TabsTrigger
            value="time"
            className="w-full"
            disabled={input.selectedDate == null}
          >
            {input.hours == null
              ? "Horaire"
              : `${input.hours.toString()}:${
                  input.minutes == 0 ? "00" : input.minutes
                }`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="date">
          <div className="flex justify-center pt-2">
            <Calendar
              locale="fr"
              minDate={new Date()}
              maxDate={addDays(new Date(), 30)}
              defaultView="month"
              tileDisabled={checkDay}
              onClickDay={(date) => {
                setInput({ selectedDate: date, hours: null, minutes: null });
              }}
            />
          </div>
        </TabsContent>
        <TabsContent value="time">
          {input.selectedDate != null ? (
            <ChooseTime
              meetingInfos={props.meetingInfos}
              input={{ ...input, selectedDate: input.selectedDate }}
              setInput={setInput}
            />
          ) : (
            <></>
          )}
        </TabsContent>
      </Tabs>
      ;
    </div>
  );
};

export default ChooseDayAndTime;

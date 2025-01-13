import { getAvailableHours } from "@/api/AvailabilitiesAPI";
import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { getHours, isSameDay } from "date-fns";

interface ChooseTimeProps {
  meetingInfos: {
    supervisorId: number;
    duration: string;
  };
  input: {
    selectedDate: Date;
    hours: number | null;
    minutes: number | null;
  };
  setInput: React.Dispatch<
    React.SetStateAction<{
      selectedDate: Date | null;
      hours: number | null;
      minutes: number | null;
    }>
  >;
}

const ChooseTime = (props: ChooseTimeProps) => {
  const currentDate = new Date();

  const AVAILABILITIES = useQuery({
    queryKey: ["availabilities", props.meetingInfos, props.input.selectedDate],
    queryFn: () =>
      getAvailableHours({
        ...props.meetingInfos,
        supervisorId: props.meetingInfos.supervisorId,
        day: props.input.selectedDate,
      }),
  });

  if (AVAILABILITIES.isLoading || AVAILABILITIES.data == undefined) {
    return <></>;
  }

  if (AVAILABILITIES.isError) {
    return (
      <div className="flex flex-col gap-8">
        <p>
          Les disponibilités n'ont pas pu être récupérées depuis le serveur.
        </p>
        <p>{AVAILABILITIES.error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {AVAILABILITIES.data?.map((availability) => (
        <Button key={`${availability.hours}-${availability.minutes}`}>
          {availability.hours}:
          {availability.minutes === 0 ? "00" : availability.minutes}
        </Button>
      ))}
      <div className="grid grid-cols-3 grid-rows-4 gap-2 sm:grid-cols-4 sm:grid-rows-3">
        {AVAILABILITIES.data.map((time) => {
          return isSameDay(props.input.selectedDate, currentDate) &&
            time.hours - 1 <= getHours(currentDate) ? (
            <></>
          ) : (
            <button
              key={`time-${time.hours}-${time.minutes}`}
              className={`rounded-md border p-2 ${
                props.input.hours == time.hours &&
                props.input.minutes == time.minutes
                  ? "border-black bg-[#F5DCA6]"
                  : ""
              }`}
              onClick={() => {
                props.setInput({
                  selectedDate: props.input.selectedDate,
                  hours: time.hours,
                  minutes: time.minutes,
                });
              }}
            >{`${time.hours}:${time.minutes == 0 ? "00" : time.minutes}`}</button>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseTime;

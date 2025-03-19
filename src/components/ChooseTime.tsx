import { getAvailableSlots } from "@/api/AvailabilitiesAPI";
import { HOUR_LIMIT_BEFORE_MEETING } from "@/lib/consts";
import { MeetingInfosWithWantedDates } from "@/lib/types/AvailabilitiesTypes";
import { useQuery } from "@tanstack/react-query";
import { getHours, isSameDay } from "date-fns";

interface ChooseTimeProps {
  meetingInfos: MeetingInfosWithWantedDates;
  input: {
    selectedDate: Date;
    startHours: number | undefined;
    startMinutes: number | undefined;
    endHours: number | undefined;
    endMinutes: number | undefined;
  };
  setInput: React.Dispatch<
    React.SetStateAction<{
      selectedDate: Date | undefined;
      startHours: number | undefined;
      startMinutes: number | undefined;
      endHours: number | undefined;
      endMinutes: number | undefined;
    }>
  >;
}

const ChooseTime = (props: ChooseTimeProps) => {
  const currentDate = new Date();

  const SLOTS = useQuery({
    queryKey: ["slots", props.meetingInfos, props.input.selectedDate],
    queryFn: () =>
      getAvailableSlots({
        ...props.meetingInfos,
        supervisor: props.meetingInfos.supervisor,
        day: props.input.selectedDate,
      }),
  });

  if (SLOTS.isLoading || SLOTS.data == undefined) {
    return <></>;
  }

  if (SLOTS.isError) {
    return (
      <div className="flex flex-col gap-8">
        <p>
          Les disponibilités n'ont pas pu être récupérées depuis le serveur.
        </p>
        <p>{SLOTS.error.message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 grid-rows-4 gap-2 sm:grid-cols-4 sm:grid-rows-3">
      {SLOTS.data.map((slot) => {
        return isSameDay(props.input.selectedDate, currentDate) &&
          slot.startHours - HOUR_LIMIT_BEFORE_MEETING <=
            getHours(currentDate) ? (
          <></>
        ) : (
          <button
            key={`slot-${slot.startHours}-${slot.startMinutes}`}
            className={`rounded-md border p-2 ${
              props.input.startHours == slot.startHours &&
              props.input.startMinutes == slot.startMinutes &&
              props.input.endHours == slot.endHours &&
              props.input.endMinutes == slot.endMinutes
                ? "border-black bg-secondary text-white"
                : "bg-white"
            } hover:border-black hover:bg-secondary hover:text-white`}
            onClick={() => {
              props.setInput({
                selectedDate: props.input.selectedDate,
                startHours: slot.startHours,
                startMinutes: slot.startMinutes,
                endHours: slot.endHours,
                endMinutes: slot.endMinutes,
              });
            }}
          >{`${slot.startHours}:${slot.startMinutes.toString().padEnd(2, "0")} - ${slot.endHours}:${slot.endMinutes.toString().padEnd(2, "0")}`}</button>
        );
      })}
    </div>
  );
};

export default ChooseTime;

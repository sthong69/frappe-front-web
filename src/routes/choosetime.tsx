import * as React from 'react'
import Page from '@/components/Page'
import { useState } from "react";
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"


export const Route = createFileRoute('/choosetime')({
  component: RouteComponent,
})



function RouteComponent() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const row1 = ["16:30", "17:00", "17:30"];
  const row2 = ["18:00", "18:30", "19:00"];
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  return (
    <Page
      className="flex flex-1 flex-col p-8"
      title="PRENDRE RENDEZ-VOUS"
      subtitle="Veuillez choisir le jour et l'heure du rendez-vous."
    >
      <div
        className="bg-gray-300 rounded-lg p-2 mt-4 "
        style={{
          width: '200px',
          textAlign: 'center',
          position: 'absolute',
          top: '30%',
          left: '5%',
        }}
      >
        <p className="text-black">Campus</p>
      </div>

      <div
        className="bg-gray-300 rounded-lg p-2 mt-4 "
        style={{
          width: '200px',
          textAlign: 'center',
          position: 'absolute',
          top: '30%',
          left: '25%',
        }}
      >
        <p className="text-black">Encadrante</p>
      </div>

      <div
        className="bg-gray-300 rounded-lg p-2 mt-4 "
        style={{
          width: '200px',
          textAlign: 'center',
          position: 'absolute',
          top: '30%',
          left: '45%',
        }}
      >
        <p className="text-black">Durée</p>
      </div>

      <div className="absolute bottom-[60%] right-10 ">
        <Link to="/meeting">
          <Button className="w-96 font-semibold text-black mx-auto" type="submit">
            Modifier
          </Button>
        </Link>
      </div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-96 h-90"
        style={{
          position: 'absolute',
          top: '70%', // 
          left: '30%', //
          transform: 'translate(-50%, -50%)', 
        }}
      />

      <div  className="absolute bottom-[50%] right-[30%] ">
        <p className="text-black">Horaire Disponible</p>
      </div>

      <div className="absolute bottom-[5%] right-[40%] ">
        <Link to="/meeting">
          <Button className="w-78 font-semibold text-black bg-red-500 hover:bg-red-600  mx-auto" type="submit">
            Annuler
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-[5%] right-[20%] ">
        <Link to="/comment">
          <Button className="w-78 font-semibold text-black mx-auto" type="submit">
            Valider
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-4 p-4 absolute bottom-[20%] right-[22%]">
      
        <div className="flex gap-4">
          {row1.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)} // 点击时设置选中时间
              className={`px-4 py-2 rounded-md text-black font-semibold 
                ${selectedTime === time ? "bg-blue-700 text-white" : "bg-gray-300"}
                hover:bg-blue-500`}
            >
              {time}
            </button>
          ))}
        </div>
        
        <div className="flex gap-4">
          {row2.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)} // 点击时设置选中时间
              className={`px-4 py-2 rounded-md text-black font-semibold 
                ${selectedTime === time ? "bg-blue-700 text-white" : "bg-gray-300"}
                hover:bg-blue-500`}
            >
              {time}
            </button>
          ))}
        </div>
    </div>

    </Page>
  )
}

import * as React from 'react'

import Page from '@/components/Page'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute('/meeting')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    //"Hello /rendez-vous!"
    <Page
      className="flex flex-1 flex-col p-8"
      title="PRENDRE RENDEZ-VOUS"
      subtitle="Veuillez sélectionner le campus, l'encadrante TING et la durée estimée du rendez-vous."
    >
      
      <div className="absolute bottom-10 right-10">
        <Link to="/choosetime">
          <Button className="w-96 font-semibold text-black mx-auto" type="submit">
            Continuer
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-[52%] left-[42%]">
        <Select>
          <SelectTrigger
            className="w-[240px]  rounded-md text-black"
            style={{ backgroundColor: 'rgb(56, 182, 255)' }}
          >
            <SelectValue placeholder="Campus" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nantes">Nante</SelectItem>
            <SelectItem value="Brest">Brest</SelectItem>
            <SelectItem value="Renne">Renne</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="absolute bottom-[42%] left-[42%]">
        <Select>
          <SelectTrigger
            className="w-[240px] text-black"
            style={{ backgroundColor: 'rgb(56, 182, 255)' }}
          >
            <SelectValue placeholder="Encadrante" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mélanie Blanchard">Mélanie Blanchard</SelectItem>
            <SelectItem value="Encadrante 2">Encadrante 2</SelectItem>
            <SelectItem value="Encadrante 3">Encadrante 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="absolute bottom-[32%] left-[42%]">
        <Select>
          <SelectTrigger
            className="w-[240px] text-black"
            style={{ backgroundColor: 'rgb(56, 182, 255)' }}
          >
            <SelectValue placeholder="Durée" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30mins">30mins</SelectItem>
            <SelectItem value="1h">1h</SelectItem>
            <SelectItem value="1h30mins">1h30mins</SelectItem>
            <SelectItem value="2h">2h</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Page>
  )
}

import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Page from '@/components/Page'

export const Route = createFileRoute('/comment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Page
        className="flex flex-1 flex-col p-8"
        title="PRENDRE RENDEZ-VOUS"
        subtitle="Veuillez choisir le jour et l'heure du rendez-vous."
    >

    </Page>
  )
}

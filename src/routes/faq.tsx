import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/faq')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /faq!'
}

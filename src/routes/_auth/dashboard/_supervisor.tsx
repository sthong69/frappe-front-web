import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/_auth/dashboard/_supervisor')({
  beforeLoad: async ({ context }) => {
    if (context.auth.userRole !== 'ROLE_SUPERVISOR') {
      toast.warning('Cette page est réservée aux encadrants.')
      throw redirect({
        to: '/',
      })
    }
  },
  component: SupervisorLayout,
})

function SupervisorLayout() {
  return <Outlet />
}

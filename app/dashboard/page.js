import { Suspense } from 'react'
import DashboardClient from './dashboardclient'

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardClient />
    </Suspense>
  )
}
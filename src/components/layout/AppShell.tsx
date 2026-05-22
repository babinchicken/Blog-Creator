import { ReactNode } from 'react'
import Navbar from './Navbar'

interface AppShellProps {
  children: ReactNode
  isAdmin: boolean
  onLogout: () => void
}

export default function AppShell({ children, isAdmin, onLogout }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-sm">
        <Navbar isAdmin={isAdmin} onLogout={onLogout} />
        <main>{children}</main>
      </div>
    </div>
  )
}

import { ReactNode } from 'react'
import Navbar from './Navbar'

interface AdminShellProps {
  children: ReactNode
  onLogout: () => void
}

export default function AdminShell({ children, onLogout }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-sm">
        <Navbar isAdmin={true} onLogout={onLogout} />
        <div className="flex">
          <aside className="w-44 border-r border-gray-100 min-h-[calc(100vh-65px)] p-4 flex-shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Admin
            </p>
            <nav className="flex flex-col gap-1">
              <span className="text-sm text-purple-700 font-medium px-2 py-1.5 bg-purple-50 rounded-lg">
                Queue
              </span>
            </nav>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  )
}

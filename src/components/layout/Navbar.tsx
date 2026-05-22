import { Link, useLocation } from 'react-router-dom'

interface NavbarProps {
  isAdmin: boolean
  onLogout: () => void
}

export default function Navbar({ isAdmin, onLogout }: NavbarProps) {
  const { pathname } = useLocation()

  function linkClass(path: string) {
    const isActive = path === '/' ? pathname === '/' : pathname.startsWith(path)
    return `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
    }`
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <Link to="/" className="flex items-center gap-2">
        <span className="text-xl font-bold text-gray-900">Blog Creator</span>
        <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-medium">
          beta
        </span>
      </Link>

      <div className="flex items-center gap-1">
        <Link to="/" className={linkClass('/')}>Home</Link>
        <Link to="/create" className={linkClass('/create')}>Create Blog</Link>

        {isAdmin && (
          <>
            <Link to="/admin" className={linkClass('/admin')}>Admin</Link>
            <button
              onClick={onLogout}
              className="ml-1 px-3 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

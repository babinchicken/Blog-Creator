import { Link } from 'react-router-dom'
import LoginForm from '../components/organisms/forms/LoginForm'

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors mb-8 block"
        >
          ← Back to home
        </Link>

        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🔐</span>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Access</h1>
          <p className="text-sm text-gray-500 mt-2">Sign in to manage blog submissions.</p>
        </div>

        {/* No real auth — any credentials grant admin access */}
        <LoginForm onLogin={() => onLogin()} />
      </div>
    </div>
  )
}

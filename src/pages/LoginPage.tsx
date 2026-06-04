import { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/organisms/forms/LoginForm'
import { login } from '../services/auth'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleAuth(email: string, password: string) {
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      onLogin()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  function handleOAuth(provider: 'google' | 'facebook') {
    // Ask the backend for the provider's redirect URL, then send the browser there
    fetch(`${API_URL}/api/auth/${provider}/redirect`)
      .then(r => r.json())
      .then(data => { window.location.href = data.url })
      .catch(() => setError(`Failed to connect to ${provider}. Is the backend running?`))
  }

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

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Social login */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => handleOAuth('google')}
            className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <button
            onClick={() => handleOAuth('facebook')}
            className="flex items-center justify-center gap-3 w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <FacebookIcon />
            Continue with Facebook
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or sign in with email</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <LoginForm onLogin={handleAuth} disabled={loading} />
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.8 29.3 4.9 24 4.9 12.4 4.9 3 14.3 3 24s9.4 19.1 21 19.1c10.4 0 20-7.5 20-19.1 0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.8 29.3 5 24 5 16.3 5 9.7 9 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 43c5.2 0 9.9-1.8 13.4-4.7l-6.2-5.2C29.2 34.8 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8L6 33.2C9.4 39.1 16.2 43 24 43z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.2l6.2 5.2C41 35.7 45 30.3 45 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#1877F2" d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24c0 12 8.8 21.9 20.2 23.7V30.9h-6v-6.9h6V18.6c0-6 3.6-9.4 9.1-9.4 2.6 0 5.4.5 5.4.5v5.9h-3c-3 0-3.9 1.9-3.9 3.8v4.5h6.7l-1.1 6.9h-5.6v16.8C39.2 45.9 48 36 48 24z" />
      <path fill="#fff" d="M33.4 30.9l1.1-6.9h-6.7v-4.5c0-1.9.9-3.8 3.9-3.8h3V9.7s-2.7-.5-5.4-.5c-5.5 0-9.1 3.4-9.1 9.4v5.4h-6v6.9h6v16.8c1.2.2 2.5.3 3.8.3s2.6-.1 3.8-.3V30.9h5.6z" />
    </svg>
  )
}

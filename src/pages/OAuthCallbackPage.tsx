import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { saveToken } from '../services/api'

interface OAuthCallbackPageProps {
  onLogin: () => void
}

export default function OAuthCallbackPage({ onLogin }: OAuthCallbackPageProps) {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  useEffect(() => {
    const token = params.get('token')
    const err   = params.get('error')

    if (token) {
      saveToken(token)
      onLogin()
      // onLogin navigates to /admin, but in case it doesn't:
      navigate('/admin', { replace: true })
    } else {
      setError(err ? decodeURIComponent(err) : 'OAuth sign-in failed.')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-sm">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            onClick={() => navigate('/admin/login')}
            className="text-sm text-indigo-600 hover:underline"
          >
            ← Back to login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <span className="animate-spin w-7 h-7 border-4 border-indigo-400 border-t-transparent rounded-full" />
        <p className="text-sm">Signing you in…</p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import FormField from '../../../molecules/FormField'
import Button from '../../../atoms/Button'

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
  disabled?: boolean
}

export default function LoginForm({ onLogin, disabled }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isValid = email.trim().length > 0 && password.trim().length > 0

  function handleSubmit() {
    if (!isValid || disabled) return
    onLogin(email.trim(), password)
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <FormField
        label="Email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        type="email"
        required
      />
      <FormField
        label="Password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••"
        type="password"
        required
      />
      <Button label={disabled ? 'Signing in…' : 'Sign In'} onClick={handleSubmit} disabled={!isValid || disabled} fullWidth />
    </div>
  )
}

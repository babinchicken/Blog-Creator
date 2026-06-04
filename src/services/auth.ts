import { api, saveToken, removeToken } from './api'

interface LoginResponse {
  token: string
  user: { id: number; name: string; email: string }
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const result = await api.post<LoginResponse>('/auth/login', { email, password })
  saveToken(result.token)
  return result
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout').catch(() => {})
  removeToken()
}

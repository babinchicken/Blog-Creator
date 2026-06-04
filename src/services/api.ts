const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export function getToken(): string | null {
  return localStorage.getItem('admin_token')
}
export function saveToken(token: string) {
  localStorage.setItem('admin_token', token)
}
export function removeToken() {
  localStorage.removeItem('admin_token')
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  form?: FormData,
): Promise<T> {
  const headers: Record<string, string> = {}
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  if (body)  headers['Content-Type']  = 'application/json'

  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers,
    body: form ?? (body !== undefined ? JSON.stringify(body) : undefined),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = err?.message ?? err?.errors ?? `HTTP ${res.status}`
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg))
  }

  return res.json()
}

export const api = {
  get:      <T>(p: string)             => request<T>('GET',    p),
  post:     <T>(p: string, b?: unknown) => request<T>('POST',   p, b),
  patch:    <T>(p: string, b?: unknown) => request<T>('PATCH',  p, b),
  delete:   <T>(p: string)             => request<T>('DELETE',  p),
  postForm: <T>(p: string, f: FormData) => request<T>('POST',   p, undefined, f),
}

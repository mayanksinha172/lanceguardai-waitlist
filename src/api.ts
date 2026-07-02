const API_BASE: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export interface SignupPayload {
  email: string
  name: string
  source: 'hero' | 'cta'
  freelance_type: string
  pain_point: string
  current_tool: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface SignupResult {
  position: number
  count: number
  already_registered: boolean
}

export async function joinWaitlist(payload: SignupPayload): Promise<SignupResult> {
  const res = await fetch(`${API_BASE}/api/waitlist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to join waitlist')
  const data: SignupResult = await res.json()
  if (data.already_registered) throw new Error('EMAIL_EXISTS')
  return data
}

export async function getWaitlistCount(): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/api/waitlist/count`)
    if (!res.ok) return 214
    const data = await res.json()
    return data.count ?? 214
  } catch {
    return 214
  }
}

// ── Admin ────────────────────────────────────────────────────────────────────

export async function adminLogin(username: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('Invalid credentials')
  const data = await res.json()
  return data.token as string
}

function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

export async function adminGetStats(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/stats`, { headers: authHeaders(token) })
  if (res.status === 401) throw new Error('401')
  return res.json()
}

export async function adminGetWaitlist(token: string, page = 1) {
  const res = await fetch(`${API_BASE}/api/admin/waitlist?page=${page}&per_page=50`, {
    headers: authHeaders(token),
  })
  if (res.status === 401) throw new Error('401')
  return res.json()
}

export async function adminExportCSV(token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/admin/export`, { headers: authHeaders(token) })
  if (!res.ok) return
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

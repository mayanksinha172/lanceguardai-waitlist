import { useState, useCallback } from 'react'

const KEY = 'fg_admin_token'

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(KEY))

  const login = useCallback((t: string) => {
    localStorage.setItem(KEY, t)
    setToken(t)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(KEY)
    setToken(null)
  }, [])

  return { token, login, logout, isAuthenticated: !!token }
}

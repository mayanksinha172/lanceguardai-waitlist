import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function AdminApp() {
  const { token, isAuthenticated, login, logout } = useAuth()

  return (
    <Routes>
      <Route
        path="login"
        element={isAuthenticated ? <Navigate to="/admin" replace /> : <Login onLogin={login} />}
      />
      <Route
        path="*"
        element={
          isAuthenticated
            ? <Dashboard token={token!} onLogout={logout} />
            : <Navigate to="/admin/login" replace />
        }
      />
    </Routes>
  )
}

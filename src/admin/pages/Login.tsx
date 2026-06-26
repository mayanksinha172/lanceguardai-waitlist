import { useState } from 'react'
import { Loader2, Lock } from 'lucide-react'
import { adminLogin } from '../../api'

interface LoginProps {
  onLogin: (token: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const token = await adminLogin(username, password)
      onLogin(token)
    } catch {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    background: '#0a0a0c',
    border: '1px solid rgba(255,255,255,0.14)',
    height: '42px',
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-[11px] font-ui font-semibold text-[#11ff99] tracking-widest uppercase">
            FreelanceGuard AI
          </span>
          <p className="text-[#464a4d] text-xs font-ui mt-1">Admin Panel</p>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 text-[#464a4d]" />
            <span className="text-sm font-ui text-[#a1a4a5]">Sign in to continue</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 text-[#fcfdff] placeholder-[#464a4d] text-sm font-ui focus:outline-none transition-all duration-200 rounded-lg"
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 text-[#fcfdff] placeholder-[#464a4d] text-sm font-ui focus:outline-none transition-all duration-200 rounded-lg"
              style={inputStyle}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
            />

            {error && (
              <p className="text-[11px] font-ui text-[#ff2047]">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-[42px] font-ui justify-center mt-1"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

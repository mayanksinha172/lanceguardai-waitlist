import { Users, BarChart2, Mail, Settings, LogOut } from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
  activePage: string
  onLogout: () => void
}

const NAV = [
  { id: 'waitlist', label: 'Waitlist', icon: Users, active: true },
  { id: 'analytics', label: 'Analytics', icon: BarChart2, active: false },
  { id: 'campaigns', label: 'Email Campaigns', icon: Mail, active: false },
  { id: 'settings', label: 'Settings', icon: Settings, active: false },
]

export default function AdminLayout({ children, activePage, onLogout }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 flex flex-col" style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Brand */}
        <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-[10px] font-ui font-semibold text-[#11ff99] tracking-widest uppercase">
            FreelanceGuard AI
          </span>
          <p className="text-[10px] font-ui text-[#464a4d] mt-0.5">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(item => {
            const isActive = item.id === activePage
            const isEnabled = item.active
            return (
              <div
                key={item.id}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-ui transition-all duration-150 relative"
                style={{
                  background: isActive ? 'rgba(17,255,153,0.07)' : 'transparent',
                  color: isActive ? '#11ff99' : isEnabled ? '#a1a4a5' : '#2a2d2f',
                  cursor: isEnabled ? 'pointer' : 'default',
                }}
              >
                <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                {item.label}
                {!isEnabled && (
                  <span className="ml-auto text-[9px] font-ui text-[#2a2d2f] border border-[#1a1d1f] rounded px-1">
                    Soon
                  </span>
                )}
              </div>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={onLogout}
            className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-xs font-ui text-[#464a4d] hover:text-[#a1a4a5] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

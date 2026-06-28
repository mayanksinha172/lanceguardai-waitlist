import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="px-6 py-10"
      style={{ borderTop: '1px solid rgba(237,240,255,0.05)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(17,255,153,0.08)', border: '1px solid rgba(17,255,153,0.18)' }}
            >
              <Shield className="w-3 h-3" style={{ color: '#11ff99' }} />
            </div>
            <span
              className="font-display font-bold text-sm"
              style={{ color: '#EDF0FF', letterSpacing: '-0.01em' }}
            >
              Lance<span style={{ color: '#11ff99' }}>Guard</span>
              <span style={{ color: 'rgba(237,240,255,0.3)' }}>AI</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map(label => (
              <a
                key={label}
                href={label === 'Contact' ? 'mailto:hello@lanceguardai.com' : '#'}
                className="font-ui text-xs transition-colors duration-200"
                style={{ color: 'rgba(237,240,255,0.3)' }}
                onMouseEnter={e => { (e.target as HTMLAnchorElement).style.color = 'rgba(237,240,255,0.65)' }}
                onMouseLeave={e => { (e.target as HTMLAnchorElement).style.color = 'rgba(237,240,255,0.3)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6" style={{ borderTop: '1px solid rgba(237,240,255,0.04)' }}>
          <p className="font-mono text-[10px] tracking-wider text-center" style={{ color: 'rgba(237,240,255,0.2)' }}>
            © 2025 LanceGuardAI · Built for freelancers who value their time
          </p>
        </div>
      </div>
    </footer>
  )
}

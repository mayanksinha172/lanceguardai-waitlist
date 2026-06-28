import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md border border-white/[0.14] bg-[#0a0a0c] flex items-center justify-center">
              <Shield className="w-3 h-3 text-[#fcfdff]" />
            </div>
            {/* Logo: Plus Jakarta Sans */}
            <span className="font-marketing font-semibold text-[#fcfdff] text-sm">LanceGuardAI</span>
          </div>

          {/* Nav links: Inter */}
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map(label => (
              <a
                key={label}
                href={label === 'Contact' ? 'mailto:hello@lanceguardai.com' : '#'}
                className="font-ui text-xs text-[#888e90] hover:text-[rgba(252,253,255,0.65)] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-6">
          {/* Copyright: Inter caption */}
          <p className="font-ui text-xs text-[#464a4d] text-center">
            © 2025 LanceGuardAI · Built for freelancers who value their time
          </p>
        </div>
      </div>
    </footer>
  )
}

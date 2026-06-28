import { type RefObject } from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

interface NavbarProps {
  formRef: RefObject<HTMLDivElement | null>
}

export default function Navbar({ formRef }: NavbarProps) {
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-[1px] z-50 flex items-center justify-between px-6 lg:px-12 h-16"
    >
      {/* Glass background */}
      <div
        className="absolute inset-0 border-b"
        style={{
          background: 'rgba(3,6,16,0.75)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderColor: 'rgba(237,240,255,0.06)',
        }}
      />

      {/* Brand */}
      <div className="relative flex items-center gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background: 'rgba(17,255,153,0.08)',
            border: '1px solid rgba(17,255,153,0.2)',
          }}
        >
          <Shield className="w-3.5 h-3.5" style={{ color: '#11ff99' }} />
        </div>
        <span
          className="font-display font-bold text-sm tracking-tight"
          style={{ color: '#EDF0FF', letterSpacing: '-0.01em' }}
        >
          Lance<span style={{ color: '#11ff99' }}>Guard</span>
          <span style={{ color: 'rgba(237,240,255,0.4)' }}>AI</span>
        </span>
        <span
          className="badge-pill ml-1 font-mono text-[10px]"
          style={{ color: 'rgba(17,255,153,0.7)', borderColor: 'rgba(17,255,153,0.15)' }}
        >
          Beta
        </span>
      </div>

      {/* CTA */}
      <button onClick={scrollToForm} className="relative btn-primary">
        Join Waitlist
      </button>
    </motion.nav>
  )
}

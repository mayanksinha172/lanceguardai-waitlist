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
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-[1px] z-50 flex items-center justify-between px-6 lg:px-12 py-0 h-16"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]" />

      <div className="relative flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg border border-white/[0.14] bg-[#0a0a0c] flex items-center justify-center">
          <Shield className="w-3.5 h-3.5 text-[#fcfdff]" />
        </div>
        {/* Logo: marketing font, tight tracking */}
        <span className="font-marketing font-semibold text-[#fcfdff] text-sm tracking-tight">
          LanceGuardAI
        </span>
        {/* Badge: Inter UI font */}
        <span className="badge-pill ml-1 font-ui">Beta</span>
      </div>

      {/* CTA: Inter, precise */}
      <button onClick={scrollToForm} className="relative btn-primary font-ui">
        Join Waitlist
      </button>
    </motion.nav>
  )
}

import { type RefObject } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  formRef: RefObject<HTMLDivElement | null>
}

export default function Navbar({ formRef }: NavbarProps) {
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="sticky top-0 z-50"
      style={{ background: 'rgba(246,241,229,0.94)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display font-black text-xl tracking-tight text-ink">
            LanceGuard<span className="text-pen">AI.</span>
          </span>
          <span className="hidden sm:inline font-mono text-[9px] tracking-[0.25em] uppercase text-ink-faint">
            Contract defense for freelancers
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-mono text-[9px] tracking-[0.25em] uppercase text-ink-faint">
            Est. 2026 · Beta
          </span>
          <button onClick={scrollToForm} className="btn-ink !h-10 !px-4 !text-[11px]">
            Join waitlist
          </button>
        </div>
      </div>
      <div className="rule-double mx-6 max-w-6xl lg:mx-auto" />
    </motion.nav>
  )
}

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
      className="sticky top-0 z-50 px-4 pt-3"
      style={{ background: 'rgba(11,37,69,0.9)', backdropFilter: 'blur(6px)' }}
    >
      {/* engineering title block */}
      <div className="title-block max-w-6xl mx-auto flex items-stretch font-display text-[10px] tracking-[0.15em] uppercase">
        <div className="px-4 py-3 flex items-center">
          <span className="font-bold text-sm tracking-[0.08em] text-line normal-case">
            LANCEGUARD<span className="text-alert">AI</span>
          </span>
        </div>
        <div className="hidden md:flex px-4 items-center text-line-soft">
          Scope defense system
        </div>
        <div className="hidden lg:flex px-4 items-center text-line-soft">
          DWG № 001
        </div>
        <div className="hidden sm:flex px-4 items-center text-line-soft">
          REV 2026.β
        </div>
        <div className="flex-1" style={{ borderRight: 'none' }} />
        <button
          onClick={scrollToForm}
          className="px-5 flex items-center font-bold text-blueprint transition-colors"
          style={{ background: 'rgba(214,232,255,0.95)', letterSpacing: '0.16em' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#FF5A45'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(214,232,255,0.95)'; e.currentTarget.style.color = '' }}
        >
          Join waitlist
        </button>
      </div>
    </motion.nav>
  )
}

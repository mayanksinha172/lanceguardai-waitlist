import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import WaitlistForm, { type WaitlistData } from './WaitlistForm'

interface FinalCTAProps {
  waitlistCount: number
  onSignup: (data: WaitlistData) => Promise<void>
}

export default function FinalCTA({ waitlistCount, onSignup }: FinalCTAProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 px-6">
      <div ref={ref} className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-faint mb-6"
        >
          {waitlistCount}+ signatories and counting
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black italic text-ink mb-4"
          style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
        >
          Sign here.
        </motion.h2>

        {/* signature flourish draws itself */}
        <svg className="mx-auto mb-8" width="220" height="24" viewBox="0 0 220 24" aria-hidden>
          <motion.path
            d="M 4 16 C 40 4, 60 22, 95 12 C 125 4, 140 20, 170 12 C 190 7, 205 14, 216 10"
            fill="none"
            stroke="#D92B1C"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeInOut' }}
          />
        </svg>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-body text-lg text-ink-soft mb-10"
        >
          Be first when we launch. Early signatories get{' '}
          <span className="hl font-semibold text-ink">3 months free</span>.
        </motion.p>

        <div className="max-w-md mx-auto text-left">
          <WaitlistForm source="cta" onSignup={onSignup} />
        </div>
      </div>
    </section>
  )
}

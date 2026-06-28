import { useState, useEffect, type RefObject } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParallaxY } from '../lib/hooks'
import WaitlistForm, { type WaitlistData } from './WaitlistForm'

const cycleWords = ['money', 'time', 'clients', 'margins']

interface HeroProps {
  formRef: RefObject<HTMLDivElement | null>
  waitlistCount: number
  onSignup: (data: WaitlistData) => Promise<void>
}

export default function Hero({ formRef, waitlistCount, onSignup }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const blobY = useParallaxY([0, -80])

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % cycleWords.length), 2400)
    return () => clearInterval(id)
  }, [])

  const headWords = 'Stop losing'.split(' ')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-8 pb-32 overflow-hidden">
      {/* Atmospheric blue glow */}
      <motion.div
        style={{ y: blobY }}
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(0,117,255,0.28) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow: Inter UI font, uppercase */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 badge-pill mb-10 font-ui"
        >
          <span className="w-1.5 h-1.5 bg-[#11ff99] rounded-full animate-glow-pulse" />
          <span>
            <span className="text-[#11ff99]">{waitlistCount}+</span> freelancers on the waitlist
          </span>
        </motion.div>

        {/* Headline: Playfair Display serif, 88px, tight */}
        <div className="mb-6">
          <h1
            className="font-display text-6xl sm:text-7xl lg:text-[88px]"
            style={{ lineHeight: 1.0, letterSpacing: '-0.02em' }}
          >
            {headWords.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block mr-[0.2em] text-[#fcfdff]"
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.65, delay: 0.18 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}

            {' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={cycleWords[wordIndex]}
                className="inline-block italic text-[#3b9eff]"
                style={{ fontStyle: 'italic' }}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {cycleWords[wordIndex]}
              </motion.span>
            </AnimatePresence>

            <motion.span
              className="block mt-3 text-[#fcfdff]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              to scope creep.
            </motion.span>
          </h1>
        </div>

        {/* Subtitle: Plus Jakarta Sans, the marketing voice */}
        <motion.p
          className="font-marketing text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: 'rgba(252,253,255,0.65)', fontWeight: 400 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          LanceGuardAI writes proposals, detects scope creep in real time, and auto-generates
          priced change orders — so every hour of work gets paid.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto mb-10"
        >
          <WaitlistForm source="hero" onSignup={onSignup} />
        </motion.div>

        {/* Stats row: JetBrains Mono for numbers, Inter for labels */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { value: `${waitlistCount}+`, label: 'on waitlist' },
            { value: '$1,200', label: 'avg saved per project' },
            { value: '< 60s', label: 'to generate a proposal' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2 text-sm">
              <span className="font-mono font-medium text-[#fcfdff]">{value}</span>
              <span className="font-ui text-[#888e90]">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}

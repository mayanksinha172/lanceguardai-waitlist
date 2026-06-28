import { useState, useEffect, type RefObject } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParallaxY } from '../lib/hooks'
import WaitlistForm, { type WaitlistData } from './WaitlistForm'

const cycleWords = ['money', 'time', 'clients', 'margins']

const FLOAT_PARTICLES = [
  { w: 1, h: 60, top: '12%', left: '8%', delay: 0, dur: 6 },
  { w: 60, h: 1, top: '28%', right: '12%', delay: 1.2, dur: 7 },
  { w: 1, h: 40, bottom: '30%', right: '22%', delay: 0.5, dur: 5 },
  { w: 40, h: 1, bottom: '18%', left: '18%', delay: 2, dur: 8 },
]

interface HeroProps {
  formRef: RefObject<HTMLDivElement | null>
  waitlistCount: number
  onSignup: (data: WaitlistData) => Promise<void>
}

export default function Hero({ formRef, waitlistCount, onSignup }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const blobY = useParallaxY([0, -60])

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % cycleWords.length), 2400)
    return () => clearInterval(id)
  }, [])

  const headWords = 'Stop losing'.split(' ')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-8 pb-32 overflow-hidden">

      {/* Deep space background layers */}
      <div className="absolute inset-0 bg-dots opacity-100 pointer-events-none" aria-hidden />

      {/* Primary blue aurora — parallax */}
      <motion.div
        style={{ y: blobY }}
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 65% 55% at 50% 30%, rgba(64,128,255,0.28) 0%, rgba(17,255,153,0.06) 50%, transparent 75%)',
          }}
        />
      </motion.div>

      {/* Secondary green accent glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '400px',
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(17,255,153,0.09) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      {/* Geometric floating lines */}
      {FLOAT_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            width: p.w, height: p.h,
            top: (p as any).top, bottom: (p as any).bottom,
            left: (p as any).left, right: (p as any).right,
            background: i % 2 === 0
              ? 'linear-gradient(180deg, transparent, rgba(17,255,153,0.35), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(64,128,255,0.35), transparent)',
          }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      ))}

      {/* Corner accent marks */}
      {[
        { top: 32, left: 32, deg: 0 },
        { top: 32, right: 32, deg: 90 },
        { bottom: 120, right: 32, deg: 180 },
        { bottom: 120, left: 32, deg: 270 },
      ].map(({ deg, ...pos }, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            ...pos,
            width: 20, height: 20,
            borderTop: '1.5px solid rgba(17,255,153,0.2)',
            borderLeft: '1.5px solid rgba(17,255,153,0.2)',
            transform: `rotate(${deg}deg)`,
          }}
          aria-hidden
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 badge-pill mb-10"
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
            style={{ background: '#11ff99', boxShadow: '0 0 6px rgba(17,255,153,0.8)' }}
          />
          <span className="font-mono text-[11px] tracking-wider" style={{ color: '#11ff99' }}>
            {waitlistCount}+
          </span>
          <span className="font-ui text-[11px]" style={{ color: 'rgba(237,240,255,0.5)' }}>
            freelancers on the waitlist
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-6">
          <h1
            className="font-display"
            style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.0, letterSpacing: '-0.03em' }}
          >
            {headWords.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block mr-[0.22em]"
                style={{ color: '#EDF0FF' }}
                initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.18 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}

            <AnimatePresence mode="wait">
              <motion.span
                key={cycleWords[wordIndex]}
                className="inline-block"
                style={{ color: '#11ff99', textShadow: '0 0 40px rgba(17,255,153,0.4)' }}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {cycleWords[wordIndex]}
              </motion.span>
            </AnimatePresence>

            <motion.span
              className="block mt-2"
              style={{ color: '#EDF0FF' }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              to scope creep.
            </motion.span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-marketing text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: 'rgba(237,240,255,0.55)', fontWeight: 300 }}
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
          className="max-w-md mx-auto mb-12"
        >
          <WaitlistForm source="hero" onSignup={onSignup} />
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85 }}
        >
          {[
            { value: `${waitlistCount}+`, label: 'on waitlist', color: '#11ff99' },
            { value: '$1,200', label: 'avg saved per project', color: '#FFD60A' },
            { value: '< 60s', label: 'to generate a proposal', color: '#4080FF' },
          ].map(({ value, label, color }) => (
            <div key={label} className="flex items-baseline gap-2 text-sm">
              <span
                className="font-mono font-semibold"
                style={{ color, textShadow: `0 0 16px ${color}60` }}
              >
                {value}
              </span>
              <span className="font-ui" style={{ color: 'rgba(237,240,255,0.35)' }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade — matches the actual bg color so it blends smoothly */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #030610, transparent)' }}
      />
    </section>
  )
}

import { useState, useEffect, type RefObject } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroBackground from './HeroBackground'
import WaitlistForm, { type WaitlistData } from './WaitlistForm'

const cycleWords = ['money', 'time', 'clients', 'margins']

interface HeroProps {
  formRef: RefObject<HTMLDivElement | null>
  waitlistCount: number
  onSignup: (data: WaitlistData) => Promise<void>
}

/* Individual letter animation for headline */
function AnimatedWord({ word, delay, color }: { word: string; delay: number; color?: string }) {
  return (
    <span className="inline-block mr-[0.22em]">
      {word.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ color: color ?? '#EDF0FF' }}
          initial={{ opacity: 0, y: 40, rotateX: -90, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default function Hero({ formRef, waitlistCount, onSignup }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const { scrollY } = useScroll()
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.97])

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % cycleWords.length), 2400)
    return () => clearInterval(id)
  }, [])

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-8 pb-32 overflow-hidden">

      {/* Full cinematic background */}
      <HeroBackground />

      {/* Content — fades on scroll */}
      <motion.div
        style={{ scale: heroScale }}
        className="relative z-10 max-w-4xl mx-auto text-center"
      >

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 badge-pill mb-12"
        >
          <span
            className="w-2 h-2 rounded-full animate-glow-pulse"
            style={{ background: '#11ff99', boxShadow: '0 0 8px rgba(17,255,153,0.9), 0 0 16px rgba(17,255,153,0.4)' }}
          />
          <span className="font-mono text-[11px] tracking-widest" style={{ color: '#11ff99' }}>
            {waitlistCount}+
          </span>
          <span className="font-ui text-[12px]" style={{ color: 'rgba(237,240,255,0.5)' }}>
            freelancers waiting · Join now
          </span>
          <span
            className="ml-1 font-mono text-[9px] px-1.5 py-0.5 rounded tracking-widest"
            style={{ color: 'rgba(17,255,153,0.7)', background: 'rgba(17,255,153,0.08)', border: '1px solid rgba(17,255,153,0.15)' }}
          >
            EARLY ACCESS
          </span>
        </motion.div>

        {/* Headline with per-letter animation */}
        <div
          className="mb-6 font-display"
          style={{ fontSize: 'clamp(3rem, 8.5vw, 5.75rem)', lineHeight: 0.97, letterSpacing: '-0.035em', perspective: '800px' }}
        >
          <div className="mb-2">
            <AnimatedWord word="Stop" delay={0.3} />
            <AnimatedWord word="losing" delay={0.5} />
          </div>

          {/* Cycling word with glitch overlay */}
          <div className="relative inline-block mb-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={cycleWords[wordIndex]}
                className="inline-block font-display"
                style={{
                  color: '#11ff99',
                  textShadow: '0 0 60px rgba(17,255,153,0.5), 0 0 120px rgba(17,255,153,0.2)',
                  fontSize: 'inherit',
                  letterSpacing: 'inherit',
                }}
                initial={{ opacity: 0, y: 32, skewX: '-8deg', filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, skewX: '0deg', filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -28, skewX: '6deg', filter: 'blur(8px)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {cycleWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div>
            <AnimatedWord word="to" delay={0.78} />
            <AnimatedWord word="scope" delay={0.9} />
            <AnimatedWord word="creep." delay={1.02} />
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-marketing text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-14"
          style={{ color: 'rgba(237,240,255,0.5)', fontWeight: 300 }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          LanceGuardAI writes proposals, detects scope creep in real time, and
          auto-generates priced change orders —
          so <span style={{ color: '#EDF0FF', fontWeight: 500 }}>every hour of work gets paid.</span>
        </motion.p>

        {/* Form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto mb-14"
        >
          <WaitlistForm source="hero" onSignup={onSignup} />
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.45 }}
        >
          {[
            { value: `${waitlistCount}+`, label: 'on waitlist', color: '#11ff99' },
            { value: '$1,200', label: 'avg saved / project', color: '#FFD60A' },
            { value: '< 60s', label: 'to generate a proposal', color: '#4080FF' },
          ].map(({ value, label, color }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
            >
              <motion.span
                className="font-display tabular-nums"
                style={{
                  color,
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  textShadow: `0 0 40px ${color}70, 0 0 80px ${color}30`,
                }}
                animate={{ textShadow: [`0 0 20px ${color}40`, `0 0 60px ${color}80`, `0 0 30px ${color}50`] }}
                transition={{ duration: 2.5, delay: 1.6 + i * 0.15, repeat: Infinity, repeatType: 'reverse' }}
              >
                {value}
              </motion.span>
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(237,240,255,0.35)' }}>
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll CTA */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <button
            onClick={scrollToForm}
            className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-200"
            style={{ color: 'rgba(237,240,255,0.25)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#11ff99' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(237,240,255,0.25)' }}
          >
            <ArrowRight className="w-3 h-3 rotate-90" />
            Scroll to learn more
          </button>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, rgba(17,255,153,0.4), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

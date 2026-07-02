import { useEffect, useRef, useState, type RefObject } from 'react'
import { motion, useInView } from 'framer-motion'
import WaitlistForm, { type WaitlistData } from './WaitlistForm'

interface HeroProps {
  formRef: RefObject<HTMLDivElement | null>
  waitlistCount: number
  onSignup: (data: WaitlistData) => Promise<void>
}

/* Count-up to 58.7 with one decimal */
function useDecimalCountUp(target: number, duration = 1600, start: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    let t0: number | null = null
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const step = (now: number) => {
      if (t0 === null) t0 = now
      const p = Math.min((now - t0) / duration, 1)
      setValue(Math.round(easeOut(p) * target * 10) / 10)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return value
}

/* ── The live contract that defends itself ──────────────────────────────── */
const creepRequests = [
  { text: 'Also add a blog with search?', price: '+$1,200' },
  { text: 'Quick logo tweak — 5 mins tops', price: '+$450' },
  { text: '3 more pages for the team bios', price: '+$600' },
]

const agreedScope = [
  'Homepage design & build',
  'About + contact pages',
  'Mobile responsive layout',
  'Two revision rounds',
]

type Phase = 'typing' | 'struck' | 'stamped'

function LiveContract() {
  const [reqIndex, setReqIndex] = useState(0)
  const [chars, setChars] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const req = creepRequests[reqIndex]

  useEffect(() => {
    if (phase !== 'typing') return
    if (chars >= req.text.length) {
      const t = setTimeout(() => setPhase('struck'), 500)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setChars(c => c + 1), 38)
    return () => clearTimeout(t)
  }, [phase, chars, req.text.length])

  useEffect(() => {
    if (phase === 'struck') {
      const t = setTimeout(() => setPhase('stamped'), 700)
      return () => clearTimeout(t)
    }
    if (phase === 'stamped') {
      const t = setTimeout(() => {
        setReqIndex(i => (i + 1) % creepRequests.length)
        setChars(0)
        setPhase('typing')
      }, 2600)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: 1.2 }}
      transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="sheet margin-line p-7 pl-14 relative"
    >
      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-faint mb-1">
        Statement of Work · № 004
      </p>
      <p className="font-display font-bold text-lg text-ink mb-5">Agreed scope</p>

      <ul className="space-y-2.5 mb-7">
        {agreedScope.map(item => (
          <li key={item} className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-money font-semibold">✓</span>
            <span className="font-body text-sm text-ink-soft">{item}</span>
          </li>
        ))}
      </ul>

      <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-faint mb-3">
        Incoming client request
      </p>

      <div className="min-h-[72px]">
        <div className="relative inline-block">
          <span className="font-body italic text-sm text-ink">
            “{req.text.slice(0, chars)}
            {phase === 'typing' && <span className="animate-caret text-pen">▌</span>}
            {phase !== 'typing' && '”'}
          </span>
          {/* red strikethrough draws across */}
          {phase !== 'typing' && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: [0.7, 0, 0.3, 1] }}
              className="absolute left-[-2px] right-[-2px] top-1/2 h-[2.5px] origin-left"
              style={{ background: '#D92B1C' }}
            />
          )}
        </div>

        {phase !== 'typing' && (
          <motion.p
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-[10px] tracking-[0.15em] font-semibold text-pen mt-2"
          >
            ✗ OUT OF SCOPE — §2.1
          </motion.p>
        )}
      </div>

      {/* stamp slams in */}
      <div className="h-16 flex items-center">
        {phase === 'stamped' && (
          <div className="stamp animate-stamp-in text-base">
            Change order {req.price}
          </div>
        )}
      </div>

      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-faint pt-4 border-t border-ink-hair">
        Auto-generated · Sent for signature
      </p>
    </motion.div>
  )
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero({ formRef, waitlistCount, onSignup }: HeroProps) {
  const statRef = useRef(null)
  const statInView = useInView(statRef, { once: true })
  const stat = useDecimalCountUp(58.7, 1600, statInView)
  const circleDone = stat >= 58.7

  return (
    <section className="relative px-6 pt-14 pb-20 lg:pt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase mb-8"
        >
          <span className="text-pen font-semibold">Source:</span>{' '}
          <span className="text-ink-soft">Moovila — 2025 State of the Industry Report</span>
        </motion.p>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">
          {/* Left: the argument */}
          <div>
            {/* Giant stat with hand-drawn red circle */}
            <div ref={statRef} className="relative inline-block mb-2">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-ink tabular-nums block"
                style={{ fontSize: 'clamp(5.5rem, 16vw, 11rem)', lineHeight: 0.9, letterSpacing: '-0.05em' }}
              >
                {stat.toFixed(1)}<span className="text-pen">%</span>
              </motion.span>

              {/* red pen ellipse draws itself around the number */}
              <svg
                className="absolute pointer-events-none"
                style={{ inset: '-12% -7%', width: '114%', height: '124%' }}
                viewBox="0 0 100 60"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d="M 50 4 C 84 2, 99 12, 98 30 C 97 50, 74 58, 48 57 C 20 56, 2 48, 3 29 C 4 10, 26 3, 58 5"
                  fill="none"
                  stroke="#D92B1C"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={circleDone ? { pathLength: 1, opacity: 0.85 } : {}}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold text-ink mb-5"
              style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              of freelancers say <span className="hl font-bold">scope creep</span> is
              their №1 problem.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-ink mb-3"
              style={{ fontSize: 'clamp(1.5rem, 3.6vw, 2.4rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}
            >
              We{' '}
              <em className="font-black not-italic text-pen relative inline-block">
                kill it
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] origin-left"
                  style={{ background: '#D92B1C' }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                />
              </em>{' '}
              automatically.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-mono text-[11px] tracking-wide text-ink-soft mb-10"
            >
              <span className="text-pen font-semibold">↑</span> up from 46% in 2024. It's getting worse, not better.
            </motion.p>

            {/* The form */}
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md mb-12"
            >
              <WaitlistForm source="hero" onSignup={onSignup} />
            </motion.div>

            {/* Ledger stats with dotted leaders */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="max-w-md space-y-2 font-mono text-[11px] tracking-wider"
            >
              {[
                { label: 'SIGNATORIES ON THE WAITLIST', value: `${waitlistCount}+` },
                { label: 'AVG RECOVERED PER PROJECT', value: '$1,200' },
                { label: 'TIME TO A SIGNED PROPOSAL', value: '< 60 sec' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span className="text-ink-soft flex-shrink-0">{label}</span>
                  <span
                    className="flex-1 border-b border-dotted"
                    style={{ borderColor: 'rgba(25,20,7,0.3)' }}
                  />
                  <span className="text-ink font-semibold text-sm">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: the contract defending itself, live */}
          <div className="lg:sticky lg:top-24">
            <LiveContract />
          </div>
        </div>
      </div>
    </section>
  )
}

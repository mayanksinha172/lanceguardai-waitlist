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

/* ── The project plan that defends itself ───────────────────────────────── */
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

function LivePlan() {
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="panel p-7"
    >
      <div className="flex items-baseline justify-between mb-1">
        <p className="font-display text-[10px] tracking-[0.25em] uppercase text-line-faint">
          Project plan · SOW-004
        </p>
        <span className="w-2 h-2 rounded-full animate-blip" style={{ background: '#7BE0A8' }} />
      </div>
      <p className="font-display font-bold text-lg text-line mb-5">Approved scope</p>

      <ul className="space-y-2.5 mb-7">
        {agreedScope.map((item, i) => (
          <li key={item} className="flex items-baseline gap-3">
            <span className="font-mono text-[10px] text-line-faint">{String(i + 1).padStart(2, '0')}</span>
            <span className="font-body text-sm text-line-soft flex-1">{item}</span>
            <span className="font-mono text-xs" style={{ color: '#7BE0A8' }}>✓</span>
          </li>
        ))}
      </ul>

      <p className="font-display text-[10px] tracking-[0.25em] uppercase text-line-faint mb-3">
        Incoming client request
      </p>

      <div className="min-h-[84px]">
        <div
          className={`relative inline-block px-2 py-1 transition-colors duration-300 ${phase !== 'typing' ? 'hatch-red' : ''}`}
        >
          <span className="font-hand text-[15px] text-line">
            “{req.text.slice(0, chars)}
            {phase === 'typing' && <span className="animate-caret text-alert">▌</span>}
            {phase !== 'typing' && '”'}
          </span>
        </div>

        {phase !== 'typing' && (
          <motion.p
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-[10px] tracking-[0.15em] font-semibold text-alert mt-2"
          >
            ⚠ OUT OF SPEC — NOT IN DRAWING
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

      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-line-faint pt-4 border-t border-line-hair">
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
          <span className="text-alert font-semibold">REF:</span>{' '}
          <span className="text-line-soft">Moovila — 2025 State of the Industry Report</span>
        </motion.p>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">
          {/* Left: the finding */}
          <div>
            {/* Giant stat, red-pencil circled */}
            <div ref={statRef} className="relative inline-block mb-4">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-bold text-line tabular-nums block"
                style={{ fontSize: 'clamp(5rem, 15vw, 10.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em' }}
              >
                {stat.toFixed(1)}<span className="text-alert">%</span>
              </motion.span>

              {/* red pencil ellipse draws itself */}
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
                  stroke="#FF5A45"
                  strokeWidth="1.6"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={circleDone ? { pathLength: 1, opacity: 0.9 } : {}}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                />
              </svg>

              {/* dimension line under the stat */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={circleDone ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 left-0 right-0 hidden sm:block"
              >
                <div className="dim-line" />
                <p className="font-hand text-xs text-line-soft text-center mt-1.5">measured 2025 — still growing</p>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold text-line mb-5 mt-8"
              style={{ fontSize: 'clamp(1.5rem, 3.8vw, 2.4rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}
            >
              of freelancers report{' '}
              <span className="hatch-red px-1.5 py-0.5 font-bold text-line whitespace-nowrap">scope creep</span>{' '}
              as their №1 problem.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-semibold text-line mb-3"
              style={{ fontSize: 'clamp(1.4rem, 3.4vw, 2.2rem)', lineHeight: 1.2 }}
            >
              We <span className="text-alert font-bold">kill it</span> automatically.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="font-hand text-sm text-line-soft mb-10"
            >
              ↑ up from 46% in 2024 — it's getting worse, not better.
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

            {/* Spec table stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="max-w-md space-y-2 font-mono text-[11px] tracking-wider"
            >
              {[
                { label: 'UNITS ON THE WAITLIST', value: `${waitlistCount}+` },
                { label: 'AVG RECOVERED PER PROJECT', value: '$1,200' },
                { label: 'TIME TO A SIGNED PROPOSAL', value: '< 60 sec' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span className="text-line-soft flex-shrink-0">{label}</span>
                  <span
                    className="flex-1 border-b border-dashed"
                    style={{ borderColor: 'rgba(214,232,255,0.3)' }}
                  />
                  <span className="text-line font-semibold text-sm">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: the plan defending itself, live */}
          <div className="lg:sticky lg:top-28">
            <LivePlan />
          </div>
        </div>
      </div>
    </section>
  )
}

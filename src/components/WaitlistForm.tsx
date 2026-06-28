import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'

export interface WaitlistData {
  name: string
  email: string
  source: 'hero' | 'cta'
  freelanceType: string
  painPoint: string
  currentTool: string
}

interface WaitlistFormProps {
  source: 'hero' | 'cta'
  onSignup: (data: WaitlistData) => Promise<void>
}

const QUESTIONS = [
  {
    key: 'freelanceType' as const,
    label: 'What type of freelance work do you do?',
    options: [
      'Development / Engineering',
      'Design (UI/UX/Graphic)',
      'Writing / Copywriting',
      'Marketing / SEO',
      'Consulting / Strategy',
      'Other',
    ],
  },
  {
    key: 'painPoint' as const,
    label: "What's your biggest pain point right now?",
    options: [
      'Scope creep eats my profits',
      'Proposals take too long',
      'Late or missing payments',
      'Managing multiple clients',
    ],
  },
  {
    key: 'currentTool' as const,
    label: 'How do you handle proposals & contracts?',
    options: [
      'Word / Google Docs',
      'Dedicated tool (Bonsai, HoneyBook…)',
      'Just email, no formal process',
      "I don't send proposals",
    ],
  },
]

const CONFETTI_COLORS = ['#11ff99', '#4080FF', '#FFD60A', '#FF6B35', '#FF2D55', '#EDF0FF']

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -24 }),
}

export default function WaitlistForm({ source, onSignup }: WaitlistFormProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [answers, setAnswers] = useState({ freelanceType: '', painPoint: '', currentTool: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confetti, setConfetti] = useState(false)

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setStep(1)
  }

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    const { freelanceType, painPoint, currentTool } = answers
    if (!freelanceType || !painPoint || !currentTool) return

    setLoading(true)
    setError('')
    try {
      await onSignup({ name, email, source, freelanceType, painPoint, currentTool })
      setConfetti(true)
      setTimeout(() => setConfetti(false), 1200)
      setStep(2)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const select = (key: keyof typeof answers, value: string) =>
    setAnswers(a => ({ ...a, [key]: value }))

  const step2Ready = answers.freelanceType && answers.painPoint && answers.currentTool

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait" custom={step === 0 ? -1 : 1}>

        {/* ── Step 1: Name + Email ── */}
        {step === 0 && (
          <motion.form
            key="step1"
            custom={-1}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleStep1}
            className="space-y-2"
          >
            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(237,240,255,0.3)' }}>
                01 / 02
              </span>
              <div className="flex gap-1 ml-auto">
                <div className="w-8 h-0.5 rounded-full" style={{ background: '#4080FF' }} />
                <div className="w-8 h-0.5 rounded-full" style={{ background: 'rgba(237,240,255,0.1)' }} />
              </div>
            </div>

            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 text-sm font-ui focus:outline-none transition-all duration-200 rounded-xl"
              style={{
                background: 'rgba(237,240,255,0.03)',
                border: '1px solid rgba(237,240,255,0.09)',
                color: '#EDF0FF',
                height: '44px',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(17,255,153,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,255,153,0.06)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(237,240,255,0.09)'; e.currentTarget.style.boxShadow = 'none' }}
            />

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 px-4 text-sm font-ui focus:outline-none transition-all duration-200 rounded-xl"
                style={{
                  background: 'rgba(237,240,255,0.03)',
                  border: '1px solid rgba(237,240,255,0.09)',
                  color: '#EDF0FF',
                  height: '44px',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(17,255,153,0.4)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,255,153,0.06)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(237,240,255,0.09)'; e.currentTarget.style.boxShadow = 'none' }}
              />
              <button type="submit" className="btn-primary h-[44px] flex-shrink-0">
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.form>
        )}

        {/* ── Step 2: Questions ── */}
        {step === 1 && (
          <motion.form
            key="step2"
            custom={1}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleStep2}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="flex items-center gap-1 font-mono text-[10px] tracking-wider transition-colors"
                style={{ color: 'rgba(237,240,255,0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(237,240,255,0.6)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(237,240,255,0.3)' }}
              >
                <ChevronLeft className="w-3 h-3" />
                Back
              </button>
              <span className="font-mono text-[10px] tracking-wider ml-auto" style={{ color: 'rgba(237,240,255,0.3)' }}>
                02 / 02
              </span>
              <div className="flex gap-1">
                <div className="w-8 h-0.5 rounded-full" style={{ background: '#11ff99' }} />
                <div className="w-8 h-0.5 rounded-full" style={{ background: '#11ff99' }} />
              </div>
            </div>

            {QUESTIONS.map(q => (
              <div key={q.key}>
                <p className="font-ui text-[11px] mb-1.5" style={{ color: 'rgba(237,240,255,0.45)' }}>{q.label}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {q.options.map(opt => {
                    const selected = answers[q.key] === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => select(q.key, opt)}
                        className="text-left px-3 py-2 rounded-xl text-[11px] font-ui transition-all duration-150 leading-tight"
                        style={{
                          background: selected ? 'rgba(17,255,153,0.07)' : 'rgba(237,240,255,0.02)',
                          border: `1px solid ${selected ? 'rgba(17,255,153,0.35)' : 'rgba(237,240,255,0.07)'}`,
                          color: selected ? '#11ff99' : 'rgba(237,240,255,0.45)',
                          boxShadow: selected ? '0 0 12px rgba(17,255,153,0.08)' : 'none',
                        }}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            {error && (
              <p className="font-mono text-[10px] tracking-wider text-center" style={{ color: '#FF2D55' }}>
                {error}
              </p>
            )}

            <div className="relative pt-1">
              {confetti && (
                <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden>
                  {Array.from({ length: 18 }).map((_, i) => {
                    const angle = (360 / 18) * i
                    const dist = 50 + Math.random() * 50
                    const tx = Math.cos((angle * Math.PI) / 180) * dist
                    const ty = Math.sin((angle * Math.PI) / 180) * dist - 40
                    return (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-sm animate-confetti"
                        style={{
                          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                          transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`,
                        }}
                      />
                    )
                  })}
                </div>
              )}
              <button
                type="submit"
                disabled={!step2Ready || loading}
                className="btn-primary w-full h-[44px] font-ui justify-center"
                style={{ opacity: step2Ready && !loading ? 1 : 0.3, cursor: step2Ready && !loading ? 'none' : 'not-allowed' }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Joining…
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}

        {/* ── Step 3: Success ── */}
        {step === 2 && (
          <motion.div
            key="success"
            custom={1}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="surface-card px-6 py-6 text-center relative overflow-hidden"
            style={{ borderColor: 'rgba(17,255,153,0.2)', boxShadow: '0 0 40px rgba(17,255,153,0.08)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(17,255,153,0.6), transparent)' }} />
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(17,255,153,0.1)', border: '1px solid rgba(17,255,153,0.2)' }}
            >
              <CheckCircle className="w-5 h-5" style={{ color: '#11ff99' }} />
            </div>
            <p className="font-display text-lg mb-1" style={{ color: '#EDF0FF', letterSpacing: '-0.02em' }}>
              You're on the list, {name.split(' ')[0]}.
            </p>
            <p className="font-marketing text-sm" style={{ color: 'rgba(237,240,255,0.4)' }}>
              We'll reach out when your spot opens.
            </p>
          </motion.div>
        )}

      </AnimatePresence>

      {step !== 2 && (
        <p className="font-mono text-[9px] tracking-widest mt-3 text-center uppercase" style={{ color: 'rgba(237,240,255,0.2)' }}>
          No credit card · No spam · Unsubscribe anytime
        </p>
      )}
    </div>
  )
}

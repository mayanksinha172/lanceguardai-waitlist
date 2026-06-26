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

const CONFETTI_COLORS = [
  '#fcfdff', '#a1a4a5', '#3b9eff', '#11ff99',
  '#ff801f', '#ffc53d', '#ff2047', '#888e90',
]

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
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-ui text-[#464a4d]">Step 1 of 2</span>
              <div className="flex gap-1 ml-auto">
                <div className="w-8 h-0.5 rounded-full bg-[#3b9eff]" />
                <div className="w-8 h-0.5 rounded-full bg-[rgba(255,255,255,0.12)]" />
              </div>
            </div>

            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 text-[#fcfdff] placeholder-[#464a4d] text-sm font-ui focus:outline-none transition-all duration-200 rounded-lg"
              style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.14)', height: '40px' }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
            />

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 px-4 text-[#fcfdff] placeholder-[#464a4d] text-sm font-ui focus:outline-none transition-all duration-200 rounded-lg"
                style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.14)', height: '40px' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
              />
              <button type="submit" className="btn-primary h-[40px] font-ui flex-shrink-0">
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
                className="flex items-center gap-1 text-[11px] font-ui text-[#464a4d] hover:text-[#a1a4a5] transition-colors"
              >
                <ChevronLeft className="w-3 h-3" />
                Back
              </button>
              <span className="text-[11px] font-ui text-[#464a4d] ml-auto">Step 2 of 2</span>
              <div className="flex gap-1">
                <div className="w-8 h-0.5 rounded-full bg-[#11ff99]" />
                <div className="w-8 h-0.5 rounded-full bg-[#11ff99]" />
              </div>
            </div>

            {QUESTIONS.map(q => (
              <div key={q.key}>
                <p className="text-[11px] font-ui text-[#a1a4a5] mb-1.5">{q.label}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {q.options.map(opt => {
                    const selected = answers[q.key] === opt
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => select(q.key, opt)}
                        className="text-left px-3 py-2 rounded-lg text-[11px] font-ui transition-all duration-150 leading-tight"
                        style={{
                          background: selected ? 'rgba(17,255,153,0.07)' : '#0a0a0c',
                          border: `1px solid ${selected ? 'rgba(17,255,153,0.4)' : 'rgba(255,255,255,0.1)'}`,
                          color: selected ? '#11ff99' : '#888e90',
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
              <p className="text-[11px] font-ui text-[#ff2047] text-center">{error}</p>
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
                className="btn-primary w-full h-[40px] font-ui justify-center"
                style={{ opacity: step2Ready && !loading ? 1 : 0.35, cursor: step2Ready && !loading ? 'pointer' : 'not-allowed' }}
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
            className="surface-card px-6 py-5 text-center"
            style={{ borderColor: 'rgba(17,255,153,0.3)' }}
          >
            <CheckCircle className="w-7 h-7 text-[#11ff99] mx-auto mb-2" />
            <p className="font-ui font-medium text-[#fcfdff] mb-1">
              You're on the list, {name.split(' ')[0]}.
            </p>
            <p className="font-marketing text-sm text-[#a1a4a5]">We'll reach out when your spot opens.</p>
          </motion.div>
        )}

      </AnimatePresence>

      {step !== 2 && (
        <p className="text-xs text-[#464a4d] mt-3 text-center font-ui">
          No credit card · No spam · Unsubscribe anytime
        </p>
      )}
    </div>
  )
}

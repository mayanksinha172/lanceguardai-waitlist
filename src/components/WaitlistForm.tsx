import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    label: 'Your line of work',
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
    label: 'What hurts most',
    options: [
      'Scope creep eats my profits',
      'Proposals take too long',
      'Late or missing payments',
      'Managing multiple clients',
    ],
  },
  {
    key: 'currentTool' as const,
    label: 'How you handle contracts today',
    options: [
      'Word / Google Docs',
      'Dedicated tool (Bonsai, HoneyBook…)',
      'Just email, no formal process',
      "I don't send proposals",
    ],
  },
]

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -24 }),
}

type Answers = { freelanceType: string[]; painPoint: string[]; currentTool: string[] }

export default function WaitlistForm({ source, onSignup }: WaitlistFormProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [answers, setAnswers] = useState<Answers>({ freelanceType: [], painPoint: [], currentTool: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setEmailError('')
    setStep(1)
  }

  const step2Ready =
    answers.freelanceType.length > 0 &&
    answers.painPoint.length > 0 &&
    answers.currentTool.length > 0

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!step2Ready) return

    setLoading(true)
    setError('')
    try {
      await onSignup({
        name,
        email,
        source,
        freelanceType: answers.freelanceType.join(', '),
        painPoint: answers.painPoint.join(', '),
        currentTool: answers.currentTool.join(', '),
      })
      setStep(2)
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      if (msg === 'EMAIL_EXISTS') {
        setEmailError('This email is already on the waitlist — use a different one.')
        setStep(0)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const toggle = (key: keyof Answers, value: string) =>
    setAnswers(a => ({
      ...a,
      [key]: a[key].includes(value) ? a[key].filter(v => v !== value) : [...a[key], value],
    }))

  const inputClass =
    'w-full bg-transparent font-body text-[15px] text-line placeholder:text-line-faint focus:outline-none py-2 border-b-[1.5px] transition-colors duration-150'

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
            className="space-y-5"
          >
            <div>
              <label className="font-display text-[10px] tracking-[0.25em] uppercase text-line-soft block mb-1">
                Full name
              </label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className={inputClass}
                style={{ borderColor: 'rgba(214,232,255,0.35)' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(214,232,255,0.9)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(214,232,255,0.35)' }}
              />
            </div>

            <div>
              <label className="font-display text-[10px] tracking-[0.25em] uppercase text-line-soft block mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="jane@studio.com"
                value={email}
                onChange={e => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                required
                className={inputClass}
                style={{ borderColor: emailError ? '#FF5A45' : 'rgba(214,232,255,0.35)' }}
                onFocus={e => { if (!emailError) e.currentTarget.style.borderColor = 'rgba(214,232,255,0.9)' }}
                onBlur={e => { if (!emailError) e.currentTarget.style.borderColor = 'rgba(214,232,255,0.35)' }}
              />
              <AnimatePresence>
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[10px] tracking-wide text-alert mt-2 font-semibold"
                  >
                    ⚠ {emailError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button type="submit" className="btn-draft w-full">
              Continue →
            </button>

            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-line-faint text-center">
              No credit card · No spam · Unsubscribe anytime
            </p>
          </motion.form>
        )}

        {/* ── Step 2: Questions (multi-select) ── */}
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
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="font-display text-[10px] tracking-[0.2em] uppercase text-line-soft hover:text-alert transition-colors"
              >
                ← Back
              </button>
              <span className="font-mono text-[10px] tracking-[0.2em] text-line-faint">
                SHEET 2 OF 2 · CHECK ALL THAT APPLY
              </span>
            </div>

            {QUESTIONS.map((q, qi) => (
              <div key={q.key}>
                <p className="font-display text-[10px] tracking-[0.25em] uppercase text-line-soft mb-2">
                  {String(qi + 1).padStart(2, '0')}. {q.label}
                  {answers[q.key].length > 0 && (
                    <span className="text-alert font-semibold ml-2">
                      [{answers[q.key].length}]
                    </span>
                  )}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {q.options.map(opt => {
                    const selected = answers[q.key].includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggle(q.key, opt)}
                        className="flex items-baseline gap-2.5 text-left py-1 group"
                      >
                        <span
                          className="flex-shrink-0 w-3.5 h-3.5 border-[1.5px] flex items-center justify-center transition-colors translate-y-[2px]"
                          style={{
                            borderColor: selected ? '#FF5A45' : 'rgba(214,232,255,0.4)',
                            background: selected ? 'rgba(255,90,69,0.15)' : 'transparent',
                          }}
                        >
                          {selected && (
                            <span className="text-alert font-mono text-[11px] font-bold leading-none">✕</span>
                          )}
                        </span>
                        <span
                          className={`font-body text-sm transition-colors ${
                            selected ? 'text-line font-medium' : 'text-line-soft group-hover:text-line'
                          }`}
                        >
                          {opt}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            {error && (
              <p className="font-mono text-[10px] tracking-wide text-alert font-semibold">⚠ {error}</p>
            )}

            <button type="submit" disabled={!step2Ready || loading} className="btn-draft w-full">
              {loading ? 'Filing…' : 'Approve & join the waitlist →'}
            </button>
          </motion.form>
        )}

        {/* ── Step 3: Success ── */}
        {step === 2 && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="panel p-7 relative"
          >
            <div className="stamp stamp--pass animate-stamp-in text-lg absolute -top-4 right-4">
              Approved
            </div>

            <p className="font-display text-[10px] tracking-[0.25em] uppercase text-line-faint mb-3">
              Inspection record
            </p>
            <p className="font-display font-bold text-2xl text-line mb-2">
              You're on the list, {name.split(' ')[0]}.
            </p>
            <p className="font-body text-sm text-line-soft mb-5 leading-relaxed">
              We'll write when your spot opens. Early units get{' '}
              <span className="font-semibold text-amber">3 months free</span>.
            </p>

            <div className="pt-4 border-t border-line-hair">
              <p className="font-mono text-[11px] leading-relaxed text-line-soft">
                <span className="text-alert font-semibold">NB:</span> confirmation email sent —
                if it's missing, check your <span className="font-semibold text-line">Spam or
                Promotions</span> folder.
              </p>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check, CheckCircle, ChevronRight, ChevronLeft, Loader2, Mail, AlertCircle } from 'lucide-react'
import MagneticButton from './MagneticButton'

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
    hint: 'Select all that apply',
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
    label: "What are your biggest pain points?",
    hint: 'Pick everything that hurts',
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
    hint: 'Select all that apply',
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

type Answers = { freelanceType: string[]; painPoint: string[]; currentTool: string[] }

export default function WaitlistForm({ source, onSignup }: WaitlistFormProps) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [answers, setAnswers] = useState<Answers>({ freelanceType: [], painPoint: [], currentTool: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confetti, setConfetti] = useState(false)

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setEmailError('')
    setStep(1)
  }

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
      setConfetti(true)
      setTimeout(() => setConfetti(false), 1200)
      setStep(2)
    } catch (err) {
      const msg = err instanceof Error ? err.message : ''
      if (msg === 'EMAIL_EXISTS') {
        setEmailError('This email is already on the waitlist — try a different one.')
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

  const step2Ready =
    answers.freelanceType.length > 0 &&
    answers.painPoint.length > 0 &&
    answers.currentTool.length > 0

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

            <div className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                    required
                    className="w-full px-4 text-sm font-ui focus:outline-none transition-all duration-200 rounded-xl"
                    style={{
                      background: emailError ? 'rgba(255,45,85,0.04)' : 'rgba(237,240,255,0.03)',
                      border: `1px solid ${emailError ? 'rgba(255,45,85,0.4)' : 'rgba(237,240,255,0.09)'}`,
                      color: '#EDF0FF',
                      height: '44px',
                      boxShadow: emailError ? '0 0 0 3px rgba(255,45,85,0.06)' : 'none',
                    }}
                    onFocus={e => {
                      if (!emailError) {
                        e.currentTarget.style.borderColor = 'rgba(17,255,153,0.4)'
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(17,255,153,0.06)'
                      }
                    }}
                    onBlur={e => {
                      if (!emailError) {
                        e.currentTarget.style.borderColor = 'rgba(237,240,255,0.09)'
                        e.currentTarget.style.boxShadow = 'none'
                      }
                    }}
                  />
                  {emailError && (
                    <AlertCircle
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                      style={{ color: '#FF2D55' }}
                    />
                  )}
                </div>
                <MagneticButton type="submit" className="btn-primary h-[44px] flex-shrink-0">
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </MagneticButton>
              </div>

              {/* Email already exists error */}
              <AnimatePresence>
                {emailError && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg"
                    style={{
                      background: 'rgba(255,45,85,0.06)',
                      border: '1px solid rgba(255,45,85,0.2)',
                    }}
                  >
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#FF2D55' }} />
                    <p className="font-mono text-[10px] tracking-wide" style={{ color: '#FF2D55' }}>
                      {emailError}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
                <div className="flex items-baseline justify-between mb-1.5">
                  <p className="font-ui text-[11px]" style={{ color: 'rgba(237,240,255,0.55)' }}>{q.label}</p>
                  <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(237,240,255,0.25)' }}>
                    {q.hint}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {q.options.map(opt => {
                    const selected = answers[q.key].includes(opt)
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggle(q.key, opt)}
                        className="relative text-left px-3 py-2 rounded-xl text-[11px] font-ui transition-all duration-150 leading-tight flex items-start gap-2"
                        style={{
                          background: selected ? 'rgba(17,255,153,0.08)' : 'rgba(237,240,255,0.02)',
                          border: `1px solid ${selected ? 'rgba(17,255,153,0.38)' : 'rgba(237,240,255,0.07)'}`,
                          color: selected ? '#11ff99' : 'rgba(237,240,255,0.45)',
                          boxShadow: selected ? '0 0 14px rgba(17,255,153,0.09)' : 'none',
                        }}
                      >
                        {/* Checkbox */}
                        <span
                          className="flex-shrink-0 mt-0.5 w-3.5 h-3.5 rounded flex items-center justify-center transition-all duration-150"
                          style={{
                            border: `1.5px solid ${selected ? '#11ff99' : 'rgba(237,240,255,0.2)'}`,
                            background: selected ? '#11ff99' : 'transparent',
                          }}
                        >
                          {selected && <Check className="w-2.5 h-2.5" style={{ color: '#030610', strokeWidth: 3 }} />}
                        </span>
                        <span>{opt}</span>
                      </button>
                    )
                  })}
                </div>
                {/* Selection count pill */}
                <AnimatePresence>
                  {answers[q.key].length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="mt-1.5 flex items-center gap-1"
                    >
                      <span
                        className="font-mono text-[9px] px-2 py-0.5 rounded-full tracking-wider"
                        style={{
                          color: '#11ff99',
                          background: 'rgba(17,255,153,0.08)',
                          border: '1px solid rgba(17,255,153,0.15)',
                        }}
                      >
                        {answers[q.key].length} selected
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-mono text-[10px] tracking-wider text-center"
                style={{ color: '#FF2D55' }}
              >
                {error}
              </motion.p>
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
              <MagneticButton
                type="submit"
                disabled={!step2Ready || loading}
                className="btn-primary w-full h-[44px] font-ui justify-center"
                style={{ opacity: step2Ready && !loading ? 1 : 0.3 }}
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
              </MagneticButton>
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
            style={{ borderColor: 'rgba(17,255,153,0.22)', boxShadow: '0 0 50px rgba(17,255,153,0.09)' }}
          >
            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(17,255,153,0.7), transparent)' }} />

            {/* Icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(17,255,153,0.1)', border: '1px solid rgba(17,255,153,0.25)' }}
            >
              <CheckCircle className="w-6 h-6" style={{ color: '#11ff99' }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-xl mb-1"
              style={{ color: '#EDF0FF', letterSpacing: '-0.02em' }}
            >
              You're on the list, {name.split(' ')[0]}.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-marketing text-sm mb-5"
              style={{ color: 'rgba(237,240,255,0.45)' }}
            >
              We'll reach out when your spot opens.
            </motion.p>

            {/* Spam notice */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(237,240,255,0.03)', border: '1px solid rgba(237,240,255,0.07)' }}
            >
              <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'rgba(237,240,255,0.4)' }} />
              <p className="font-mono text-[10px] tracking-wide text-left leading-relaxed" style={{ color: 'rgba(237,240,255,0.4)' }}>
                Confirmation email sent — if you don't see it,{' '}
                <span style={{ color: 'rgba(237,240,255,0.7)' }}>check your Spam or Promotions folder.</span>
              </p>
            </motion.div>
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

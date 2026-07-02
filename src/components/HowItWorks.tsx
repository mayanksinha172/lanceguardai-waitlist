import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: 'I.',
    title: 'Draft',
    description:
      'Enter project details — AI writes a professional, value-based proposal in under 60 seconds, with scope protection built in.',
  },
  {
    number: 'II.',
    title: 'Sign',
    description:
      'Share one branded link. Your client views, signs, and pays the 50% deposit — all on one page. No back-and-forth.',
  },
  {
    number: 'III.',
    title: 'Defend',
    description:
      'Every client message is scanned. Extras get flagged, priced, and sent as a change order automatically. Every hour gets paid.',
  },
]

function StepRow({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-[64px_1fr] sm:grid-cols-[110px_200px_1fr] gap-4 sm:gap-8 items-baseline py-8 border-b border-line-hair"
    >
      <span
        className="font-display font-black text-alert"
        style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', lineHeight: 1 }}
      >
        {step.number}
      </span>
      <h3 className="font-display font-bold text-2xl sm:text-3xl text-line" style={{ letterSpacing: '-0.02em' }}>
        {step.title}
      </h3>
      <p className="col-span-2 sm:col-span-1 font-body text-[15px] leading-relaxed text-line-soft max-w-lg">
        {step.description}
      </p>
    </motion.div>
  )
}

export default function HowItWorks() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-20 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-2xl"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-alert font-semibold mb-4">
            DWG 005 — Assembly instructions
          </p>
          <h2
            className="font-display font-bold text-line"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
          >
            From proposal to protected income.
          </h2>
          <p className="font-body text-lg text-line-soft mt-4">
            What used to take 3 days of back-and-forth now takes 15 minutes.
          </p>
        </motion.div>

        <div className="border-t border-line-hair">
          {steps.map((step, i) => <StepRow key={step.number} step={step} index={i} />)}
        </div>
      </div>
    </section>
  )
}

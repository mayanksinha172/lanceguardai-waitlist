import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, Link2, ShieldCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Create your proposal',
    description:
      'Enter project details — AI writes a professional, value-based proposal in under 60 seconds with scope protection built in.',
    accent: '#FF6B35',
  },
  {
    number: '02',
    icon: Link2,
    title: 'Send one link',
    description:
      'Share a single branded link. Your client views the proposal, signs, and pays the 50% deposit — all on one page. No back-and-forth.',
    accent: '#4080FF',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'AI defends your scope',
    description:
      'Every client message is scanned. Extras get flagged, priced, and sent as a change order automatically. You get paid for every hour.',
    accent: '#11ff99',
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center gap-5"
    >
      {/* Watermark number */}
      <span
        className="absolute font-display select-none pointer-events-none"
        style={{
          fontSize: '80px',
          lineHeight: 1,
          color: 'rgba(237,240,255,0.025)',
          letterSpacing: '-0.04em',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        aria-hidden
      >
        {step.number}
      </span>

      <div className="relative">
        <div
          className="relative w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: `${step.accent}10`,
            border: `1px solid ${step.accent}25`,
            boxShadow: `0 0 24px ${step.accent}15`,
          }}
        >
          <step.icon className="w-6 h-6" style={{ color: step.accent }} />
        </div>
        {/* Connector line */}
        {index < steps.length - 1 && (
          <div
            className="hidden lg:block absolute top-7 left-full ml-8 h-px pointer-events-none"
            style={{
              width: 'calc(100% + 2rem)',
              background: `linear-gradient(90deg, ${step.accent}40, rgba(237,240,255,0.05))`,
            }}
          />
        )}
      </div>

      <div>
        <h3
          className="font-display text-xl mb-3"
          style={{ color: '#EDF0FF', lineHeight: 1.2, letterSpacing: '-0.02em' }}
        >
          {step.title}
        </h3>
        <p className="font-marketing text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'rgba(237,240,255,0.45)', fontWeight: 300 }}>
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,53,0.09) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] mb-5" style={{ color: '#FF6B35' }}>
            How it works
          </p>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#EDF0FF' }}
          >
            From proposal to protected income.
          </h2>
          <p className="font-marketing text-lg max-w-xl mx-auto" style={{ color: 'rgba(237,240,255,0.5)', fontWeight: 300 }}>
            What used to take 3 days of back-and-forth now takes 15 minutes.
          </p>
        </motion.div>

        <div className="relative grid lg:grid-cols-3 gap-14 lg:gap-8">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

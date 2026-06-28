import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, FileText, CreditCard, RefreshCw, Brain, Globe } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'AI Scope Defender',
    description:
      'Every client message is scanned against your original contract. Scope creep gets flagged in real time — before you accidentally say yes.',
    accent: '#4080FF',
    span: 'col-span-6 lg:col-span-4',
    big: true,
  },
  {
    icon: FileText,
    title: 'Instant Proposals',
    description: 'Professional, value-based proposals generated in under 60 seconds.',
    accent: '#EDF0FF',
    span: 'col-span-6 sm:col-span-3 lg:col-span-2',
  },
  {
    icon: CreditCard,
    title: 'Deposit Protection',
    description: 'Automatic 50% upfront deposit built into every proposal.',
    accent: '#11ff99',
    span: 'col-span-6 sm:col-span-3 lg:col-span-2',
  },
  {
    icon: RefreshCw,
    title: 'Change Orders',
    description: 'One-click priced change orders sent directly to the client for approval.',
    accent: '#FFD60A',
    span: 'col-span-6 sm:col-span-2 lg:col-span-2',
  },
  {
    icon: Brain,
    title: 'Value Pricing AI',
    description: 'AI recommends pricing based on client industry and project complexity.',
    accent: '#FF6B35',
    span: 'col-span-6 sm:col-span-2 lg:col-span-2',
  },
  {
    icon: Globe,
    title: 'Client Portal',
    description: 'One link: proposal, e-sign, payment, and project updates.',
    accent: '#4080FF',
    span: 'col-span-6 sm:col-span-2 lg:col-span-2',
  },
]

function FeatureCell({ f, index }: { f: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`${f.span} surface-card card-hover p-8 flex flex-col gap-5 relative overflow-hidden`}
    >
      {/* Subtle top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${f.accent}30, transparent)` }}
      />

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: `${f.accent}10`,
          border: `1px solid ${f.accent}25`,
        }}
      >
        <f.icon className="w-5 h-5" style={{ color: f.accent }} />
      </div>

      <div>
        <h3
          className={`font-display mb-2.5 ${f.big ? 'text-2xl' : 'text-xl'}`}
          style={{ color: '#EDF0FF', lineHeight: 1.15, letterSpacing: '-0.02em' }}
        >
          {f.title}
        </h3>
        <p
          className={`font-marketing leading-relaxed ${f.big ? 'text-base' : 'text-sm'}`}
          style={{ color: 'rgba(237,240,255,0.45)' }}
        >
          {f.description}
        </p>
      </div>

      {f.big && (
        <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(237,240,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-glow-pulse"
              style={{ background: '#11ff99', boxShadow: '0 0 6px rgba(17,255,153,0.8)' }}
            />
            <span className="font-mono text-[10px] tracking-wider" style={{ color: 'rgba(237,240,255,0.3)' }}>
              Runs automatically on every client message
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function BentoFeatures() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(64,128,255,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] mb-5" style={{ color: '#4080FF' }}>
            Features
          </p>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#EDF0FF' }}
          >
            Everything you need to protect your income.
          </h2>
        </motion.div>

        <div className="grid grid-cols-6 gap-3">
          {features.map((f, i) => (
            <FeatureCell key={f.title} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const clauses = [
  {
    ref: '§1.1',
    title: 'AI Scope Defender',
    description:
      'Every client message is scanned against your signed contract. Scope creep gets flagged in real time — before you accidentally say yes.',
    stamped: true,
  },
  {
    ref: '§1.2',
    title: 'Instant Proposals',
    description: 'Professional, value-based proposals generated in under 60 seconds.',
  },
  {
    ref: '§2.1',
    title: 'Deposit Protection',
    description: 'Automatic 50% upfront deposit built into every proposal.',
  },
  {
    ref: '§2.2',
    title: 'Change Orders',
    description: 'One-click priced change orders sent directly to the client for approval.',
  },
  {
    ref: '§3.1',
    title: 'Value Pricing AI',
    description: 'Pricing recommended from client industry and project complexity.',
  },
  {
    ref: '§3.2',
    title: 'Client Portal',
    description: 'One link: proposal, e-sign, payment, and project updates.',
  },
]

function Clause({ c, index }: { c: typeof clauses[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-7 border-ink-hair"
      style={{ borderWidth: '0 1px 1px 0', borderStyle: 'solid' }}
    >
      {c.stamped && (
        <div className="stamp text-[11px] absolute top-4 right-4">Automatic</div>
      )}
      <p className="font-mono text-[11px] tracking-[0.2em] text-pen font-semibold mb-3">{c.ref}</p>
      <h3 className="font-display font-bold text-xl text-ink mb-2.5" style={{ letterSpacing: '-0.02em' }}>
        {c.title}
      </h3>
      <p className="font-body text-sm leading-relaxed text-ink-soft">{c.description}</p>
    </motion.div>
  )
}

export default function BentoFeatures() {
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
          className="mb-14 max-w-2xl"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-pen font-semibold mb-4">
            Terms of protection
          </p>
          <h2
            className="font-display font-bold text-ink"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
          >
            Everything you need, <em className="font-black">in writing.</em>
          </h2>
        </motion.div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 border-ink-hair"
          style={{ borderWidth: '1px 0 0 1px', borderStyle: 'solid' }}
        >
          {clauses.map((c, i) => <Clause key={c.ref} c={c} index={i} />)}
        </div>
      </div>
    </section>
  )
}

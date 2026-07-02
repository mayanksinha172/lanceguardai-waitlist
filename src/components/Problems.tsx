import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../lib/hooks'

const stats = [
  {
    target: 30,
    suffix: '%',
    label: 'of project profit',
    sub: 'lost to untracked scope creep',
  },
  {
    target: 10,
    suffix: ' hrs',
    label: 'per client, wasted',
    sub: 'on admin, revisions & chasing invoices',
  },
  {
    target: 60,
    suffix: ' days',
    label: 'average payment delay',
    sub: 'without an upfront deposit clause',
  },
]

function StatEntry({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, count } = useCountUp(stat.target, 1600)
  const rowRef = useRef(null)
  const inView = useInView(rowRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-8 lg:py-2 lg:px-10 lg:first:pl-0 lg:last:pr-0"
    >
      <p className="font-display text-[10px] tracking-[0.25em] uppercase text-line-faint mb-3">
        Measurement {String(index + 1).padStart(2, '0')}
      </p>
      <div className="relative inline-block mb-4">
        <span
          className="font-display font-bold text-alert tabular-nums"
          style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
        >
          <span ref={ref}>{count}</span>
          <span style={{ fontSize: '55%' }}>{stat.suffix}</span>
        </span>
        {/* dimension line beneath */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.12 }}
          className="dim-line mt-3 origin-left"
        />
      </div>
      <p className="font-display font-semibold text-lg text-line leading-tight">{stat.label}</p>
      <p className="font-body text-sm text-line-soft mt-1">{stat.sub}</p>
    </motion.div>
  )
}

export default function Problems() {
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
          <p className="font-display text-[10px] tracking-[0.3em] uppercase text-alert font-semibold mb-4">
            DWG 002 — Site survey
          </p>
          <h2
            className="font-display font-bold text-line"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.08, letterSpacing: '-0.01em' }}
          >
            The measurements are embarrassing.
          </h2>
          <p className="font-body text-lg text-line-soft mt-4">
            Freelancers lose thousands every year — not to bad clients, but to
            work that was never in the drawing.
          </p>
        </motion.div>

        <div
          className="grid lg:grid-cols-3 lg:divide-x divide-y lg:divide-y-0"
          style={{ borderColor: 'rgba(214,232,255,0.16)' }}
        >
          {stats.map((stat, i) => <StatEntry key={stat.label} stat={stat} index={i} />)}
        </div>
      </div>
    </section>
  )
}

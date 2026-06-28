import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../lib/hooks'

const stats = [
  {
    target: 30,
    suffix: '%',
    label: 'of project profit',
    sub: 'lost to untracked scope creep',
    accent: '#FF2D55',
    glow: 'rgba(255,45,85,0.2)',
    border: 'rgba(255,45,85,0.15)',
  },
  {
    target: 10,
    suffix: ' hrs',
    label: 'per client wasted',
    sub: 'on admin, revisions & chasing invoices',
    accent: '#FFD60A',
    glow: 'rgba(255,214,10,0.15)',
    border: 'rgba(255,214,10,0.12)',
  },
  {
    target: 60,
    suffix: ' days',
    label: 'average payment delay',
    sub: 'without an upfront deposit clause',
    accent: '#4080FF',
    glow: 'rgba(64,128,255,0.2)',
    border: 'rgba(64,128,255,0.15)',
  },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, count } = useCountUp(stat.target, 1800)
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="surface-card p-8 text-center card-hover group relative overflow-hidden"
      style={{
        boxShadow: `0 0 60px ${stat.glow}, inset 0 1px 0 ${stat.border}`,
        borderColor: stat.border,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)`,
          boxShadow: `0 0 12px ${stat.accent}80`,
        }}
      />

      <div
        className="font-display tabular-nums mb-3"
        style={{
          fontSize: 'clamp(3.5rem, 6vw, 5rem)',
          color: stat.accent,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          textShadow: `0 0 40px ${stat.accent}60`,
        }}
      >
        <span ref={ref}>{count}</span>
        <span style={{ fontSize: '70%' }}>{stat.suffix}</span>
      </div>

      <p
        className="font-display text-base mb-1.5"
        style={{ color: '#EDF0FF', lineHeight: 1.3, fontWeight: 600 }}
      >
        {stat.label}
      </p>
      <p className="font-marketing text-sm" style={{ color: 'rgba(237,240,255,0.4)' }}>
        {stat.sub}
      </p>
    </motion.div>
  )
}

export default function Problems() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      {/* Centered glow — not top-only, so it doesn't bleed into black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,45,85,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p
            className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] mb-5"
            style={{ color: '#FF2D55' }}
          >
            The problem
          </p>
          <h2
            className="font-display mb-5"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#EDF0FF',
            }}
          >
            The numbers are embarrassing.
          </h2>
          <p className="font-marketing text-lg max-w-lg mx-auto" style={{ color: 'rgba(237,240,255,0.5)', fontWeight: 300 }}>
            Freelancers lose thousands every year — not from bad clients, but from missing the right tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

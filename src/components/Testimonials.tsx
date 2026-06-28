import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quotes = [
  {
    body: 'I used to lose 20–30% of every project to scope creep. LanceGuardAI caught it automatically — I sent a change order before I even knew what happened. First week: $800 extra.',
    name: 'Alex Rivera',
    role: 'Full-Stack Developer',
    avatar: 'AR',
    accent: '#4080FF',
  },
  {
    body: "The proposal generation is insane. Clients actually compliment how professional it looks. And deposit enforcement? Game changer. I haven't chased a payment in 3 months.",
    name: 'Priya Nair',
    role: 'UI/UX Designer',
    avatar: 'PN',
    accent: '#11ff99',
  },
  {
    body: 'As a freelance copywriter, scope creep killed my margins. I thought it was a "me" problem until I used LanceGuardAI. Now my clients respect boundaries because the contract enforces them.',
    name: 'Marcus Webb',
    role: 'Freelance Copywriter',
    avatar: 'MW',
    accent: '#FFD60A',
  },
]

function QuoteCard({ q, index }: { q: typeof quotes[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="surface-card card-hover p-7 flex flex-col gap-5 relative overflow-hidden"
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${q.accent}50, transparent)` }}
      />

      {/* Opening quote mark */}
      <span
        className="font-display text-6xl leading-none select-none"
        style={{ color: `${q.accent}18`, lineHeight: 1 }}
        aria-hidden
      >
        "
      </span>

      {/* Quote body */}
      <p
        className="font-marketing text-sm leading-relaxed flex-1"
        style={{ color: 'rgba(237,240,255,0.65)', lineHeight: 1.8, fontWeight: 300 }}
      >
        {q.body}
      </p>

      <div
        className="flex items-center gap-3 pt-4"
        style={{ borderTop: '1px solid rgba(237,240,255,0.06)' }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: `${q.accent}12`,
            border: `1px solid ${q.accent}25`,
          }}
        >
          <span className="font-mono text-[10px] font-semibold" style={{ color: q.accent }}>{q.avatar}</span>
        </div>
        <div>
          <p className="font-marketing text-sm font-medium" style={{ color: '#EDF0FF' }}>{q.name}</p>
          <p className="font-ui text-xs" style={{ color: 'rgba(237,240,255,0.35)' }}>{q.role}</p>
        </div>
        <div
          className="ml-auto text-[10px] font-mono px-2 py-1 rounded"
          style={{
            color: q.accent,
            background: `${q.accent}10`,
            border: `1px solid ${q.accent}20`,
          }}
        >
          VERIFIED
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 px-6">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(17,255,153,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] mb-5" style={{ color: '#11ff99' }}>
            Early access
          </p>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#EDF0FF' }}
          >
            Freelancers already winning.
          </h2>
          <p className="font-marketing text-lg max-w-lg mx-auto" style={{ color: 'rgba(237,240,255,0.5)', fontWeight: 300 }}>
            Beta users who got early access. You could be next.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {quotes.map((q, i) => (
            <QuoteCard key={q.name} q={q} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

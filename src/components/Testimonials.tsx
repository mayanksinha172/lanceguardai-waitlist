import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quotes = [
  {
    body: 'I used to lose 20–30% of every project to scope creep. LanceGuardAI caught it automatically — I sent a change order before I even knew what happened. First week: $800 extra.',
    name: 'Alex Rivera',
    role: 'Full-Stack Developer',
    avatar: 'AR',
  },
  {
    body: "The proposal generation is insane. Clients actually compliment how professional it looks. And deposit enforcement? Game changer. I haven't chased a payment in 3 months.",
    name: 'Priya Nair',
    role: 'UI/UX Designer',
    avatar: 'PN',
  },
  {
    body: 'As a freelance copywriter, scope creep killed my margins. I thought it was a "me" problem until I used LanceGuardAI. Now my clients respect boundaries because the contract enforces them.',
    name: 'Marcus Webb',
    role: 'Freelance Copywriter',
    avatar: 'MW',
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
      className="surface-card p-7 flex flex-col gap-5 hover:scale-[1.01] transition-transform duration-300"
    >
      {/* Opening quote: Playfair Display italic, decorative */}
      <span
        className="font-display text-5xl leading-none select-none"
        style={{ color: 'rgba(255,255,255,0.1)', fontStyle: 'italic', lineHeight: 1 }}
        aria-hidden
      >
        "
      </span>

      {/* Quote body: Playfair Display italic — editorial, literary feel */}
      <p
        className="font-display text-sm leading-relaxed flex-1"
        style={{
          color: 'rgba(252,253,255,0.75)',
          fontStyle: 'italic',
          fontWeight: 400,
          lineHeight: 1.75,
        }}
      >
        {q.body}
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <div className="w-8 h-8 rounded-full bg-[#101012] border border-white/[0.14] flex items-center justify-center flex-shrink-0">
          {/* Avatar initials: JetBrains Mono for precision */}
          <span className="font-mono text-[10px] font-medium text-[#fcfdff]">{q.avatar}</span>
        </div>
        <div>
          {/* Name: Plus Jakarta Sans, medium weight */}
          <p className="font-marketing text-sm font-medium text-[#fcfdff]">{q.name}</p>
          {/* Role: Inter UI, muted */}
          <p className="font-ui text-xs text-[#888e90]">{q.role}</p>
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
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="font-ui text-xs font-medium uppercase tracking-widest text-[#11ff99] mb-4">Early access</p>
          <h2
            className="font-display text-4xl lg:text-5xl text-[#fcfdff] mb-5"
            style={{ lineHeight: 1.08, letterSpacing: '-0.02em', fontWeight: 400 }}
          >
            Freelancers already winning.
          </h2>
          <p className="font-marketing text-lg max-w-lg mx-auto" style={{ color: 'rgba(252,253,255,0.65)' }}>
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

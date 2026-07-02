import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const quotes = [
  {
    exhibit: 'REPORT 01',
    body: 'I used to lose 20–30% of every project to scope creep. LanceGuardAI caught it automatically — I sent a change order before I even knew what happened. First week: $800 extra.',
    name: 'Alex Rivera',
    role: 'Full-Stack Developer',
    saved: '+$800',
    tilt: -1.2,
  },
  {
    exhibit: 'REPORT 02',
    body: "The proposal generation is insane. Clients actually compliment how professional it looks. And deposit enforcement? I haven't chased a payment in 3 months.",
    name: 'Priya Nair',
    role: 'UI/UX Designer',
    saved: '+$2,100',
    tilt: 0.9,
  },
  {
    exhibit: 'REPORT 03',
    body: 'Scope creep killed my margins. I thought it was a "me" problem until I used LanceGuardAI. Now clients respect boundaries because the contract enforces them.',
    name: 'Marcus Webb',
    role: 'Freelance Copywriter',
    saved: '+$1,400',
    tilt: -0.7,
  },
]

function QuoteSheet({ q, index }: { q: typeof quotes[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, rotate: 0 }}
      animate={inView ? { opacity: 1, y: 0, rotate: q.tilt } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, y: -4, transition: { duration: 0.25 } }}
      className="panel relative p-7 flex flex-col gap-5 h-full"
    >
      {/* tape */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 rotate-[-2deg]"
        style={{ background: 'rgba(214,232,255,0.07)', border: '1px solid rgba(214,232,255,0.05)' }}
        aria-hidden
      />

      <div className="flex items-baseline justify-between">
        <p className="font-mono text-[10px] tracking-[0.25em] text-line-faint">{q.exhibit}</p>
        <p className="font-mono text-sm font-semibold text-amber">{q.saved} <span className="text-[9px] font-normal text-line-faint">recovered</span></p>
      </div>

      <p className="font-display italic text-[17px] leading-relaxed text-line flex-1">
        “{q.body}”
      </p>

      <div className="pt-4 border-t border-line-hair">
        <p className="font-body text-sm font-semibold text-line">{q.name}</p>
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-line-faint mt-0.5">
          {q.role} · field inspection
        </p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
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
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-alert font-semibold mb-4">
            Inspection reports
          </p>
          <h2
            className="font-display font-bold text-line"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
          >
            Freelancers already <em className="font-black">winning.</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => <QuoteSheet key={q.name} q={q} index={i} />)}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import WaitlistForm, { type WaitlistData } from './WaitlistForm'

interface FinalCTAProps {
  waitlistCount: number
  onSignup: (data: WaitlistData) => Promise<void>
}

export default function FinalCTA({ waitlistCount, onSignup }: FinalCTAProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Strong centered aurora */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(64,128,255,0.18) 0%, rgba(17,255,153,0.07) 50%, transparent 75%)' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />

      {/* Corner brackets */}
      {[
        { top: 48, left: 48 },
        { top: 48, right: 48, transform: 'scaleX(-1)' },
        { bottom: 48, left: 48, transform: 'scaleY(-1)' },
        { bottom: 48, right: 48, transform: 'scale(-1)' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute pointer-events-none"
          style={{
            ...pos,
            width: 28,
            height: 28,
            borderTop: '2px solid rgba(17,255,153,0.2)',
            borderLeft: '2px solid rgba(17,255,153,0.2)',
          }}
          aria-hidden
        />
      ))}

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="inline-flex items-center gap-2 badge-pill mb-10"
            style={{ borderColor: 'rgba(64,128,255,0.2)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#4080FF', boxShadow: '0 0 6px rgba(64,128,255,0.8)' }}
            />
            <span className="font-mono text-[11px] tracking-wider" style={{ color: '#4080FF' }}>
              {waitlistCount}+
            </span>
            <span className="font-ui text-[11px]" style={{ color: 'rgba(237,240,255,0.5)' }}>
              freelancers already signed up
            </span>
          </div>

          <h2
            className="font-display mb-6"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#EDF0FF',
            }}
          >
            Ready to stop leaving money on the table?
          </h2>

          <p className="font-marketing text-lg mb-10" style={{ color: 'rgba(237,240,255,0.5)', fontWeight: 300 }}>
            Join the waitlist. Be first when we launch.{' '}
            <span
              className="font-semibold"
              style={{ color: '#11ff99', textShadow: '0 0 20px rgba(17,255,153,0.4)' }}
            >
              3 months free
            </span>{' '}
            for early members.
          </p>

          <div className="max-w-sm mx-auto">
            <WaitlistForm source="cta" onSignup={onSignup} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import WaitlistForm, { type WaitlistData } from './WaitlistForm'

interface FinalCTAProps {
  waitlistCount: number
  onSignup: (data: WaitlistData) => Promise<void>
}

export default function FinalCTA({ waitlistCount, onSignup }: FinalCTAProps) {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,117,255,0.22) 0%, transparent 65%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="badge-pill mb-8 inline-flex font-ui">
            <span className="w-1.5 h-1.5 bg-[#3b9eff] rounded-full" />
            {waitlistCount}+ freelancers already signed up
          </span>

          <h2
            className="font-display text-5xl lg:text-6xl text-[#fcfdff] mb-6"
            style={{ lineHeight: 1.0, letterSpacing: '-0.025em', fontWeight: 400 }}
          >
            Ready to stop leaving money on the table?
          </h2>

          <p className="font-marketing text-lg mb-10" style={{ color: 'rgba(252,253,255,0.65)' }}>
            Join the waitlist. Be first when we launch.{' '}
            Early members get <span className="text-[#11ff99]">3 months free</span>.
          </p>

          <div className="max-w-sm mx-auto">
            <WaitlistForm source="cta" onSignup={onSignup} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

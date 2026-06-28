import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { AlertTriangle, CheckCircle, FileText, DollarSign } from 'lucide-react'

type DemoStep = 'idle' | 'scanning' | 'flagged' | 'order'

const clientMessage =
  'Hey! The homepage looks great. Can you also add a blog section with categories and search? And maybe 3 more pages for the team?'

const originalScope = [
  'Homepage design',
  'About page',
  'Contact form with email',
  'Mobile responsive layout',
]

export default function ScopeDemo() {
  const [step, setStep] = useState<DemoStep>('idle')
  const [scanProgress, setScanProgress] = useState(0)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, margin: '-100px' })
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>
    let t3: ReturnType<typeof setTimeout>, t4: ReturnType<typeof setTimeout>
    let raf: number

    const runCycle = () => {
      setStep('idle'); setScanProgress(0)
      t1 = setTimeout(() => {
        setStep('scanning')
        const start = performance.now()
        const animate = (now: number) => {
          const p = Math.min(((now - start) / 2000) * 100, 100)
          setScanProgress(p)
          if (p < 100) raf = requestAnimationFrame(animate)
        }
        raf = requestAnimationFrame(animate)
        t2 = setTimeout(() => {
          setStep('flagged')
          t3 = setTimeout(() => { setStep('order'); t4 = setTimeout(runCycle, 5000) }, 1800)
        }, 2200)
      }, 1200)
    }

    runCycle()
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      cancelAnimationFrame(raf)
    }
  }, [inView])

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,255,153,0.10) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-ui text-xs font-medium uppercase tracking-widest text-[#11ff99] mb-4">Live demo</p>
          <h2
            className="font-display text-4xl lg:text-5xl text-[#fcfdff] mb-5"
            style={{ lineHeight: 1.08, letterSpacing: '-0.02em', fontWeight: 400 }}
          >
            Watch AI catch scope creep.
          </h2>
          <p className="font-marketing text-lg max-w-xl mx-auto" style={{ color: 'rgba(252,253,255,0.65)' }}>
            This is exactly what LanceGuardAI does the moment a client message arrives.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Left: client context */}
          <div className="space-y-3">
            <div className="surface-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#101012] border border-white/[0.14] flex items-center justify-center">
                  {/* Avatar: JetBrains Mono */}
                  <span className="font-mono text-xs font-medium text-[#fcfdff]">S</span>
                </div>
                <div>
                  <p className="font-marketing text-sm font-medium text-[#fcfdff]">Sarah Chen</p>
                  <p className="font-ui text-xs text-[#888e90]">just now</p>
                </div>
              </div>
              {/* Message: Plus Jakarta Sans — conversational */}
              <p className="font-marketing text-sm leading-relaxed" style={{ color: 'rgba(252,253,255,0.65)' }}>
                {clientMessage}
              </p>
            </div>

            <div className="surface-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-[#a1a4a5]" />
                {/* Label: Inter uppercase */}
                <p className="font-ui text-xs font-medium uppercase tracking-wider text-[#888e90]">Original Scope</p>
              </div>
              <ul className="space-y-2">
                {originalScope.map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#11ff99] flex-shrink-0" />
                    {/* Scope items: Plus Jakarta Sans */}
                    <span className="font-marketing text-sm text-[#a1a4a5]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: detection panel */}
          <motion.div
            animate={
              step === 'flagged' || step === 'order'
                ? { boxShadow: '0 0 50px rgba(17,255,153,0.12), 0 0 1px rgba(17,255,153,0.4)', borderColor: 'rgba(17,255,153,0.3)' }
                : { boxShadow: 'none', borderColor: 'rgba(255,255,255,0.14)' }
            }
            transition={{ duration: 0.5 }}
            className="surface-card p-5 min-h-[320px] flex flex-col"
          >
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.06]">
              <div className={`w-2 h-2 rounded-full ${step === 'idle' ? 'bg-[#464a4d]' : step === 'scanning' ? 'bg-[#ffc53d] animate-pulse' : 'bg-[#11ff99]'}`} />
              {/* Panel header: Inter */}
              <p className="font-ui text-xs font-medium text-[#888e90] uppercase tracking-wider">LanceGuardAI</p>
              <AnimatePresence>
                {step === 'scanning' && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="ml-auto font-ui text-xs text-[#ffc53d]">
                    Analyzing…
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {step === 'scanning' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-5">
                  <div className="relative h-[2px] bg-white/[0.06] rounded-full overflow-hidden mb-2">
                    <div className="absolute left-0 top-0 h-full rounded-full"
                      style={{ width: `${scanProgress}%`, background: 'linear-gradient(90deg, #3b9eff, #11ff99)' }} />
                  </div>
                  <p className="font-ui text-xs text-[#888e90]">Comparing message against signed contract scope…</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(step === 'flagged' || step === 'order') && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="space-y-2.5 mb-4">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg border"
                    style={{ background: 'rgba(255,32,71,0.06)', borderColor: 'rgba(255,32,71,0.2)' }}>
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-[#ff2047]" />
                    <span className="font-ui text-sm font-medium text-[#ff2047]">2 OUT-OF-SCOPE requests detected</span>
                    <span className="ml-auto font-mono text-xs text-[#ff2047]/60">97%</span>
                  </div>

                  {[
                    { item: 'Blog section + search + categories', price: '+$1,200' },
                    { item: '3 additional team pages', price: '+$600' },
                  ].map(({ item, price }, i) => (
                    <motion.div key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] bg-[#06060a]">
                      <span className="font-marketing text-sm text-[#a1a4a5]">{item}</span>
                      {/* Price: JetBrains Mono — numerical precision */}
                      <span className="font-mono text-sm font-medium text-[#11ff99]">{price}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step === 'order' && (
                <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-auto p-4 rounded-lg border"
                  style={{ background: 'rgba(255,197,61,0.05)', borderColor: 'rgba(255,197,61,0.25)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-[#ffc53d]" />
                    <span className="font-ui text-sm font-medium text-[#ffc53d]">Change Order Generated</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-marketing text-sm text-[#888e90]">2 items · ready to send</span>
                    {/* Total: JetBrains Mono */}
                    <span className="font-mono text-lg font-medium text-[#ffc53d]">$1,800</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step === 'idle' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-center">
                  <p className="font-ui text-sm text-[#464a4d]">Waiting for client message…</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

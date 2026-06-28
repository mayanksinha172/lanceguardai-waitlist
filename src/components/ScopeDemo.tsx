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
      {/* Centered green glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(17,255,153,0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] mb-5" style={{ color: '#11ff99' }}>
            Live demo
          </p>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#EDF0FF' }}
          >
            Watch AI catch scope creep.
          </h2>
          <p className="font-marketing text-lg max-w-xl mx-auto" style={{ color: 'rgba(237,240,255,0.5)', fontWeight: 300 }}>
            This is exactly what LanceGuardAI does the moment a client message arrives.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 items-start">
          {/* Left: client context */}
          <div className="space-y-3">
            <div className="surface-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(64,128,255,0.12)', border: '1px solid rgba(64,128,255,0.2)' }}
                >
                  <span className="font-mono text-xs font-semibold" style={{ color: '#4080FF' }}>S</span>
                </div>
                <div>
                  <p className="font-marketing text-sm font-medium" style={{ color: '#EDF0FF' }}>Sarah Chen</p>
                  <p className="font-ui text-xs" style={{ color: 'rgba(237,240,255,0.35)' }}>just now</p>
                </div>
              </div>
              <p className="font-marketing text-sm leading-relaxed" style={{ color: 'rgba(237,240,255,0.6)' }}>
                {clientMessage}
              </p>
            </div>

            <div className="surface-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-3.5 h-3.5" style={{ color: 'rgba(237,240,255,0.3)' }} />
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'rgba(237,240,255,0.35)' }}>
                  Original Scope
                </p>
              </div>
              <ul className="space-y-2">
                {originalScope.map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#11ff99' }} />
                    <span className="font-marketing text-sm" style={{ color: 'rgba(237,240,255,0.55)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: detection panel */}
          <motion.div
            animate={
              step === 'flagged' || step === 'order'
                ? { boxShadow: '0 0 60px rgba(17,255,153,0.1), 0 0 1px rgba(17,255,153,0.35)', borderColor: 'rgba(17,255,153,0.2)' }
                : { boxShadow: '0 0 0px transparent', borderColor: 'rgba(237,240,255,0.07)' }
            }
            transition={{ duration: 0.5 }}
            className="surface-card p-5 min-h-[320px] flex flex-col scan-container"
          >
            <div className="flex items-center gap-2 mb-5 pb-4" style={{ borderBottom: '1px solid rgba(237,240,255,0.06)' }}>
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  step === 'idle' ? '' : step === 'scanning' ? 'animate-pulse' : ''
                }`}
                style={{
                  background: step === 'idle' ? 'rgba(237,240,255,0.2)' : step === 'scanning' ? '#FFD60A' : '#11ff99',
                  boxShadow: step === 'scanning' ? '0 0 8px rgba(255,214,10,0.8)' : step !== 'idle' ? '0 0 8px rgba(17,255,153,0.8)' : 'none',
                }}
              />
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'rgba(237,240,255,0.35)' }}>
                LanceGuardAI
              </p>
              <AnimatePresence>
                {step === 'scanning' && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="ml-auto font-mono text-[10px]" style={{ color: '#FFD60A' }}>
                    Analyzing…
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {step === 'scanning' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-5">
                  <div
                    className="relative h-[2px] rounded-full overflow-hidden mb-2"
                    style={{ background: 'rgba(237,240,255,0.05)' }}
                  >
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        width: `${scanProgress}%`,
                        background: 'linear-gradient(90deg, #4080FF, #11ff99)',
                        boxShadow: '0 0 8px rgba(17,255,153,0.5)',
                        transition: 'width 0.05s linear',
                      }}
                    />
                  </div>
                  <p className="font-mono text-[10px]" style={{ color: 'rgba(237,240,255,0.3)' }}>
                    Comparing message against signed contract scope…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {(step === 'flagged' || step === 'order') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-2.5 mb-4"
                >
                  <div
                    className="flex items-center gap-2 p-3 rounded-xl"
                    style={{ background: 'rgba(255,45,85,0.06)', border: '1px solid rgba(255,45,85,0.18)' }}
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" style={{ color: '#FF2D55' }} />
                    <span className="font-mono text-xs font-semibold" style={{ color: '#FF2D55' }}>
                      2 OUT-OF-SCOPE requests detected
                    </span>
                    <span className="ml-auto font-mono text-xs" style={{ color: 'rgba(255,45,85,0.5)' }}>97%</span>
                  </div>

                  {[
                    { item: 'Blog section + search + categories', price: '+$1,200' },
                    { item: '3 additional team pages', price: '+$600' },
                  ].map(({ item, price }, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: 'rgba(237,240,255,0.02)', border: '1px solid rgba(237,240,255,0.06)' }}
                    >
                      <span className="font-marketing text-sm" style={{ color: 'rgba(237,240,255,0.5)' }}>{item}</span>
                      <span className="font-mono text-sm font-semibold" style={{ color: '#11ff99' }}>{price}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step === 'order' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-auto p-4 rounded-xl"
                  style={{ background: 'rgba(255,214,10,0.05)', border: '1px solid rgba(255,214,10,0.2)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4" style={{ color: '#FFD60A' }} />
                    <span className="font-mono text-xs font-semibold" style={{ color: '#FFD60A' }}>
                      Change Order Generated
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-marketing text-sm" style={{ color: 'rgba(237,240,255,0.4)' }}>
                      2 items · ready to send
                    </span>
                    <span
                      className="font-mono text-xl font-semibold"
                      style={{ color: '#FFD60A', textShadow: '0 0 20px rgba(255,214,10,0.5)' }}
                    >
                      $1,800
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step === 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-center"
                >
                  <p className="font-mono text-xs tracking-wider" style={{ color: 'rgba(237,240,255,0.2)' }}>
                    Waiting for client message…
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

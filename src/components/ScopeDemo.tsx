import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

type DemoStep = 'idle' | 'scanning' | 'flagged' | 'order'

const clientMessage =
  'Hey! The homepage looks great. Can you also add a blog section with categories and search? And maybe 3 more pages for the team?'

const originalScope = [
  'Homepage design',
  'About page',
  'Contact form with email',
  'Mobile responsive layout',
]

const flaggedItems = [
  { item: 'Blog section + search + categories', price: '+$1,200' },
  { item: '3 additional team pages', price: '+$600' },
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
    <section ref={sectionRef} className="relative py-20 lg:py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-2xl"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-alert font-semibold mb-4">
            DWG 003 — Field test, recorded live
          </p>
          <h2
            className="font-display font-bold text-line"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
          >
            Watch the AI <span className="hatch-red px-1.5">catch it red-handed.</span>
          </h2>
          <p className="font-body text-lg text-line-soft mt-4">
            This is exactly what happens the moment a client message arrives.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: the client's letter */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: -0.8 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="panel p-6"
            >
              <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-line-hair">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-line-faint">
                  From: Sarah Chen
                </p>
                <p className="font-mono text-[10px] text-line-faint">just now</p>
              </div>
              <p className="font-body italic text-[15px] leading-relaxed text-line">
                “{clientMessage}”
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 0.6 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="panel p-6"
            >
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-line-faint mb-4">
                Signed scope · SOW № 004
              </p>
              <ul className="space-y-2">
                {originalScope.map(item => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="font-mono text-xs font-semibold text-amber">✓</span>
                    <span className="font-body text-sm text-line-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right: the audit sheet */}
          <div className="panel p-6 min-h-[380px] flex flex-col">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-line-hair">
              <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-line-soft font-semibold">
                LanceGuardAI · Audit
              </p>
              <AnimatePresence mode="wait">
                {step === 'scanning' && (
                  <motion.span
                    key="scanning"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="font-mono text-[10px] text-line-soft"
                  >
                    reviewing against contract…
                  </motion.span>
                )}
                {(step === 'flagged' || step === 'order') && (
                  <motion.span
                    key="done"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="font-mono text-[10px] font-semibold text-alert"
                  >
                    2 VIOLATIONS FOUND
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* scanning: red pen progress line */}
            <AnimatePresence>
              {step === 'scanning' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-5">
                  <div className="relative h-[3px] mb-2" style={{ background: 'rgba(214,232,255,0.08)' }}>
                    <div
                      className="absolute left-0 top-0 h-full"
                      style={{ width: `${scanProgress}%`, background: '#FF5A45', transition: 'width 0.05s linear' }}
                    />
                  </div>
                  <p className="font-mono text-[10px] text-line-faint">
                    comparing request · clause by clause
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* flagged items — struck through with price in the margin */}
            <AnimatePresence>
              {(step === 'flagged' || step === 'order') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 mb-6"
                >
                  {flaggedItems.map(({ item, price }, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12 + i * 0.12 }}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <div className="relative inline-block">
                        <span className="font-body text-sm text-line">{item}</span>
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: 0.3 + i * 0.15, ease: [0.7, 0, 0.3, 1] }}
                          className="absolute left-0 right-0 top-1/2 h-[2px] origin-left"
                          style={{ background: '#FF5A45' }}
                        />
                      </div>
                      <span className="font-mono text-sm font-semibold text-amber whitespace-nowrap">{price}</span>
                    </motion.div>
                  ))}
                  <p className="font-mono text-[10px] tracking-[0.15em] font-semibold text-alert">
                    ✗ NOT IN SIGNED SCOPE — §2.1, §2.4
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* change order stamp + total */}
            <div className="mt-auto">
              <AnimatePresence>
                {step === 'order' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-end justify-between pt-4 border-t border-line-hair"
                  >
                    <div className="stamp animate-stamp-in text-base">Change order</div>
                    <div className="text-right">
                      <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-line-faint mb-1">
                        2 items · ready to send
                      </p>
                      <p className="font-display font-black text-3xl text-line tabular-nums">$1,800</p>
                    </div>
                  </motion.div>
                )}
                {step === 'idle' && (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="font-mono text-[11px] text-line-faint text-center pb-8"
                  >
                    awaiting client correspondence…
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

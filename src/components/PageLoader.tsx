import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  onDone: () => void
}

const BRAND_CHARS = 'LanceGuardAI'.split('')

export default function PageLoader({ onDone }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [visibleChars, setVisibleChars] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Type in brand name character by character
    const charInterval = setInterval(() => {
      setVisibleChars(n => {
        if (n >= BRAND_CHARS.length) { clearInterval(charInterval); return n }
        return n + 1
      })
    }, 55)

    // Progress bar
    let p = 0
    const progressInterval = setInterval(() => {
      const jump = Math.random() * 12 + 4
      p = Math.min(p + jump, 100)
      setProgress(p)
      if (p >= 100) {
        clearInterval(progressInterval)
        setTimeout(() => {
          setDone(true)
          setTimeout(onDone, 500)
        }, 250)
      }
    }, 90)

    return () => {
      clearInterval(charInterval)
      clearInterval(progressInterval)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9995] flex flex-col items-center justify-center select-none"
          style={{ background: '#030610' }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(17,255,153,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(17,255,153,0.5) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(17,255,153,0.5), transparent)' }}
            initial={{ top: '0%', opacity: 0 }}
            animate={{ top: '100%', opacity: [0, 0.8, 0.8, 0] }}
            transition={{ duration: 1.8, ease: 'linear', repeat: Infinity, repeatDelay: 0.4 }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Brand name with character-by-character reveal */}
            <div className="flex items-baseline gap-0 overflow-hidden">
              {BRAND_CHARS.map((char, i) => {
                const isVisible = i < visibleChars
                const isGreen = i >= 5 && i <= 9  // 'Guard' part
                const isDim = i >= 10              // 'AI' part
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '2.25rem',
                      letterSpacing: '-0.02em',
                      color: isDim ? 'rgba(237,240,255,0.3)' : isGreen ? '#11ff99' : '#EDF0FF',
                    }}
                  >
                    {char}
                  </motion.span>
                )
              })}
              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '2rem',
                  background: '#11ff99',
                  marginLeft: '3px',
                  borderRadius: '1px',
                  alignSelf: 'center',
                  boxShadow: '0 0 8px rgba(17,255,153,0.8)',
                }}
              />
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visibleChars >= 6 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(237,240,255,0.2)' }}
            >
              Initializing · AI Scope Guardian
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 flex flex-col gap-2">
              <div
                className="h-px rounded-full overflow-hidden"
                style={{ background: 'rgba(237,240,255,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #4080FF, #11ff99)',
                    boxShadow: '0 0 8px rgba(17,255,153,0.5)',
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.12, ease: 'linear' }}
                />
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[9px] tracking-wider" style={{ color: 'rgba(237,240,255,0.15)' }}>
                  BOOT_SEQUENCE
                </span>
                <span className="font-mono text-[9px]" style={{ color: 'rgba(17,255,153,0.5)' }}>
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PageLoaderProps {
  onDone: () => void
}

const TYPED = 'LANCEGUARD AI — DWG № 001 — SCOPE DEFENSE SYSTEM'

export default function PageLoader({ onDone }: PageLoaderProps) {
  const [chars, setChars] = useState(0)
  const [stamped, setStamped] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const typer = setInterval(() => {
      setChars(c => {
        if (c >= TYPED.length) { clearInterval(typer); return c }
        return c + 1
      })
    }, 18)
    const stampT = setTimeout(() => setStamped(true), TYPED.length * 18 + 250)
    const doneT = setTimeout(() => { setGone(true); onDone() }, TYPED.length * 18 + 1050)
    return () => { clearInterval(typer); clearTimeout(stampT); clearTimeout(doneT) }
  }, [onDone])

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8"
          style={{ background: '#0B2545' }}
        >
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-line">
            {TYPED.slice(0, chars)}
            <span className="animate-caret">▌</span>
          </p>
          {stamped && (
            <div className="stamp stamp--pass animate-stamp-in text-xl sm:text-2xl">Approved</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

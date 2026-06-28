import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const ringX = useSpring(mouseX, { stiffness: 160, damping: 18, mass: 0.08 })
  const ringY = useSpring(mouseY, { stiffness: 160, damping: 18, mass: 0.08 })

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const attachHover = () => {
      document.querySelectorAll('a, button, input, textarea, select, label, [role="button"]').forEach(el => {
        (el as HTMLElement).addEventListener('mouseenter', () => setHovered(true))
        ;(el as HTMLElement).addEventListener('mouseleave', () => setHovered(false))
      })
    }
    attachHover()
    const obs = new MutationObserver(attachHover)
    obs.observe(document.body, { subtree: true, childList: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      obs.disconnect()
    }
  }, [])

  const dotSize = clicked ? 4 : 6
  const ringSize = hovered ? 42 : clicked ? 20 : 30

  return (
    <>
      {/* Precise dot — follows instantly */}
      <motion.div
        style={{
          position: 'fixed',
          left: mouseX,
          top: mouseY,
          x: -dotSize / 2,
          y: -dotSize / 2,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: hovered ? 'transparent' : '#11ff99',
          boxShadow: hovered ? 'none' : '0 0 10px rgba(17,255,153,0.9), 0 0 20px rgba(17,255,153,0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'width 0.15s, height 0.15s, background 0.15s, box-shadow 0.15s, opacity 0.2s',
        }}
      />

      {/* Trailing ring — follows with spring lag */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        animate={{
          x: -ringSize / 2,
          y: -ringSize / 2,
          width: ringSize,
          height: ringSize,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: hovered ? '1.5px solid rgba(17,255,153,0.8)' : '1px solid rgba(17,255,153,0.4)',
            background: hovered ? 'rgba(17,255,153,0.06)' : 'transparent',
            transition: 'border 0.2s, background 0.2s',
          }}
        />
      </motion.div>
    </>
  )
}

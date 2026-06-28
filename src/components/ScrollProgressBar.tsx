import { motion } from 'framer-motion'
import { useScrollProgress } from '../lib/hooks'

export default function ScrollProgressBar() {
  const width = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 h-[1.5px] z-[100]"
      style={{
        width,
        background: 'linear-gradient(90deg, #4080FF, #11ff99)',
        boxShadow: '0 0 8px rgba(17,255,153,0.6)',
      }}
    />
  )
}

import { motion, useScroll } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[120] origin-left"
      style={{ scaleX: scrollYProgress, background: '#D92B1C' }}
    />
  )
}

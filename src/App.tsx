import { useRef, useState } from 'react'
import ScrollProgressBar from './components/ScrollProgressBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Problems from './components/Problems'
import ScopeDemo from './components/ScopeDemo'
import BentoFeatures from './components/BentoFeatures'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import SectionDivider from './components/SectionDivider'
import Footer from './components/Footer'
import type { WaitlistData } from './components/WaitlistForm'

export default function App() {
  const formRef = useRef<HTMLDivElement | null>(null)
  const [waitlistCount, setWaitlistCount] = useState(214)

  const handleSignup = (_data: WaitlistData) => {
    setWaitlistCount(c => c + 1)
  }

  return (
    <div className="min-h-screen bg-black font-body">
      <ScrollProgressBar />
      <Navbar formRef={formRef} />
      <Hero formRef={formRef} waitlistCount={waitlistCount} onSignup={handleSignup} />
      <SectionDivider />
      <Marquee />
      <SectionDivider />
      <Problems />
      <SectionDivider />
      <ScopeDemo />
      <SectionDivider />
      <BentoFeatures />
      <SectionDivider />
      <HowItWorks />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <FinalCTA waitlistCount={waitlistCount} onSignup={handleSignup} />
      <Footer />
    </div>
  )
}

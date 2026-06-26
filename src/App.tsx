import { useEffect, useRef, useState } from 'react'
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
import { joinWaitlist, getWaitlistCount } from './api'

export default function App() {
  const formRef = useRef<HTMLDivElement | null>(null)
  const [waitlistCount, setWaitlistCount] = useState(214)

  useEffect(() => {
    getWaitlistCount().then(count => {
      if (count > 0) setWaitlistCount(count)
    })
  }, [])

  const handleSignup = async (data: WaitlistData): Promise<void> => {
    const result = await joinWaitlist({
      email: data.email,
      name: data.name,
      source: data.source,
      freelance_type: data.freelanceType,
      pain_point: data.painPoint,
      current_tool: data.currentTool,
    })
    setWaitlistCount(result.count)
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

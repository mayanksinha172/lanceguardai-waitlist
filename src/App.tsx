import { useEffect, useRef, useState } from 'react'
import ScrollProgressBar from './components/ScrollProgressBar'
import CustomCursor from './components/CustomCursor'
import PageLoader from './components/PageLoader'
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

function useUtmParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
  }
}

export default function App() {
  const formRef = useRef<HTMLDivElement | null>(null)
  const [waitlistCount, setWaitlistCount] = useState(214)
  const [loaded, setLoaded] = useState(false)
  const utmParams = useUtmParams()

  useEffect(() => {
    getWaitlistCount().then(count => {
      if (count > 0) setWaitlistCount(Math.max(count, 20))
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
      ...utmParams,
    })
    setWaitlistCount(result.count)
  }

  return (
    <>
      <CustomCursor />
      <PageLoader onDone={() => setLoaded(true)} />

      <div
        className="min-h-screen font-body"
        style={{
          background: '#030610',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
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
    </>
  )
}

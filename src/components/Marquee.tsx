const painPoints = [
  '"Can you just add one more thing?"',
  'Unpaid revision #7',
  '"I thought that was included"',
  '3AM emergency, no extra pay',
  'Scope changed. Again.',
  'Proposal accepted. Profit: gone.',
  'Client ghosted after revisions',
  '6 deliverables became 18',
  'Invoice disputed. No contract.',
  '"I just need a small tweak"',
]

export default function Marquee() {
  const items = [...painPoints, ...painPoints]

  return (
    <div className="relative py-8 overflow-hidden">
      {/* Fade edges */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #030610, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(270deg, #030610, transparent)' }}
      />

      <div className="flex animate-marquee whitespace-nowrap gap-3">
        {items.map((text, i) => (
          <span
            key={i}
            className="font-marketing inline-flex items-center gap-2.5 px-4 py-2 text-sm flex-shrink-0 rounded-full transition-colors duration-200"
            style={{
              background: 'rgba(237,240,255,0.03)',
              border: '1px solid rgba(237,240,255,0.07)',
              color: 'rgba(237,240,255,0.4)',
            }}
          >
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: i % 3 === 0 ? '#FF2D55' : i % 3 === 1 ? '#FFD60A' : '#4080FF', opacity: 0.7 }}
            />
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

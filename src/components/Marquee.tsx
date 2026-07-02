const creepQuotes = [
  '"can you just add one more page?"',
  '"quick logo tweak, 5 mins tops"',
  '"I thought that was included"',
  '"small change before we pay"',
  '"one more revision, promise"',
  '"my nephew had some ideas"',
  '"while you\'re in there…"',
  '"the team wants a blog now"',
]

export default function Marquee() {
  const items = [...creepQuotes, ...creepQuotes]

  return (
    <div className="relative py-1 my-8 overflow-hidden select-none" aria-hidden>
      <div className="absolute top-0 left-0 right-0 border-t-[1.5px] border-dashed" style={{ borderColor: 'rgba(255,90,69,0.6)' }} />
      <div className="absolute bottom-0 left-0 right-0 border-b-[1.5px] border-dashed" style={{ borderColor: 'rgba(255,90,69,0.6)' }} />

      <div className="flex whitespace-nowrap animate-marquee w-max py-3">
        {items.map((quote, i) => (
          <span key={i} className="flex items-center font-mono text-xs tracking-wide">
            <span className="italic text-line-soft">{quote}</span>
            <span className="mx-3 font-semibold text-alert">⚠ OUT OF SPEC</span>
            <span className="mx-3 text-line-faint">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}

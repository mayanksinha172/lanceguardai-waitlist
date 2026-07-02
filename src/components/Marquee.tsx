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
    <div className="relative py-4 my-6 overflow-hidden select-none" aria-hidden>
      <div className="absolute top-0 left-0 right-0 rule-double" />
      <div className="absolute bottom-0 left-0 right-0 rule-double" />

      <div className="flex whitespace-nowrap animate-marquee w-max py-3">
        {items.map((quote, i) => (
          <span key={i} className="flex items-center font-mono text-xs tracking-wide">
            <span className="italic text-ink-soft">{quote}</span>
            <span className="mx-3 font-semibold text-pen">✗ FLAGGED</span>
            <span className="mx-3 text-ink-faint">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

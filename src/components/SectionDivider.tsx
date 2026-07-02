export default function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-4" aria-hidden>
      <div className="flex-1 rule-double" />
      {label && (
        <span className="font-mono text-[10px] tracking-[0.3em] text-ink-faint uppercase flex-shrink-0">
          § {label}
        </span>
      )}
      <div className="flex-1 rule-double" />
    </div>
  )
}

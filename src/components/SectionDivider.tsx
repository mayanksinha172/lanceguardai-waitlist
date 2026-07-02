export default function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4" aria-hidden>
      <span className="font-mono text-line-faint text-xs">+</span>
      <div className="flex-1 dim-line" />
      {label && (
        <span className="font-display text-[10px] tracking-[0.3em] text-line-soft uppercase flex-shrink-0">
          {label}
        </span>
      )}
      <div className="flex-1 dim-line" />
      <span className="font-mono text-line-faint text-xs">+</span>
    </div>
  )
}

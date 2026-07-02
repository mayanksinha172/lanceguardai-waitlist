export default function Footer() {
  return (
    <footer className="px-6 pt-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="rule-double mb-8" />
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-faint mb-4">
          The fine print
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-sm text-ink-soft max-w-md leading-relaxed">
            © 2026 LanceGuardAI. We will never sell your email, spam you, or add
            surprise line items. That would be scope creep, and we kill that.
          </p>
          <div className="flex items-center gap-6 font-mono text-[11px] tracking-wider text-ink-soft">
            <a href="mailto:hello@lanceguard.ai" className="hover:text-pen transition-colors">CONTACT</a>
            <a href="https://twitter.com/lanceguardai" target="_blank" rel="noreferrer" className="hover:text-pen transition-colors">TWITTER</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

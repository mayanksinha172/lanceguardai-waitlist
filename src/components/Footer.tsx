export default function Footer() {
  return (
    <footer className="px-4 pb-6 pt-2">
      <div className="title-block max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 font-display text-[10px] tracking-[0.15em] uppercase">
        <div className="px-4 py-3">
          <p className="text-line-faint mb-1">Drawn by</p>
          <p className="text-line-soft">LanceGuardAI · 2026</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-line-faint mb-1">Scale</p>
          <p className="text-line-soft">No spam · 1:1</p>
        </div>
        <div className="px-4 py-3">
          <p className="text-line-faint mb-1">Contact</p>
          <a href="mailto:hello@lanceguard.ai" className="text-line-soft hover:text-alert transition-colors normal-case">hello@lanceguard.ai</a>
        </div>
        <div className="px-4 py-3">
          <p className="text-line-faint mb-1">Revision</p>
          <p className="text-line-soft">β — unsubscribe anytime</p>
        </div>
      </div>
    </footer>
  )
}

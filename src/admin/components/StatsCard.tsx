interface StatsCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: string
}

export default function StatsCard({ label, value, sub, accent = '#3b9eff' }: StatsCardProps) {
  return (
    <div className="surface-card px-5 py-4">
      <p className="text-[11px] font-ui text-[#464a4d] mb-2 uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-mono font-medium" style={{ color: accent }}>
        {value}
      </p>
      {sub && <p className="text-[11px] font-ui text-[#464a4d] mt-1">{sub}</p>}
    </div>
  )
}

import { useEffect, useState, useMemo } from 'react'
import { Download, RefreshCw, Search } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import StatsCard from '../components/StatsCard'
import { adminGetStats, adminGetWaitlist, adminExportCSV } from '../../api'

interface DashboardProps {
  token: string
  onLogout: () => void
}

interface Entry {
  id: number
  name: string
  email: string
  source: string
  freelance_type: string | null
  pain_point: string | null
  current_tool: string | null
  signed_up_at: string
  user_agent: string | null
}

interface Stats {
  total: number
  today: number
  this_week: number
  hero_count: number
  cta_count: number
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function parseBrowser(ua: string | null) {
  if (!ua) return '—'
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('curl')) return 'curl'
  return ua.slice(0, 20)
}

const TH = 'text-left text-[10px] font-ui font-medium text-[#464a4d] uppercase tracking-wider py-3 px-4 whitespace-nowrap'
const TD = 'py-3 px-4 text-sm font-ui text-[#a1a4a5] align-top'

export default function Dashboard({ token, onLogout }: DashboardProps) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [entries, setEntries] = useState<Entry[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  const load = async (p = page) => {
    setLoading(true)
    try {
      const [s, w] = await Promise.all([
        adminGetStats(token),
        adminGetWaitlist(token, p),
      ])
      setStats(s)
      setEntries(w.entries)
      setTotal(w.total)
    } catch (e: unknown) {
      if (e instanceof Error && e.message === '401') onLogout()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [page])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return entries
    return entries.filter(e =>
      e.email.toLowerCase().includes(q) ||
      e.name.toLowerCase().includes(q)
    )
  }, [entries, search])

  const handleExport = async () => {
    setExporting(true)
    await adminExportCSV(token)
    setExporting(false)
  }

  const perPage = 50
  const totalPages = Math.ceil(total / perPage)

  return (
    <AdminLayout activePage="waitlist" onLogout={onLogout}>
      <div className="p-8 max-w-[1200px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-ui font-medium text-[#fcfdff]">Waitlist</h1>
            <p className="text-[12px] font-ui text-[#464a4d] mt-0.5">All signups with survey responses</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => load()}
              className="btn-ghost h-[36px] px-3 text-xs font-ui"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="btn-ghost h-[36px] px-4 text-xs font-ui"
            >
              <Download className="w-3.5 h-3.5" />
              {exporting ? 'Exporting…' : 'Export CSV'}
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <StatsCard label="Total Signups" value={stats?.total ?? '—'} accent="#11ff99" />
          <StatsCard label="Today" value={stats?.today ?? '—'} accent="#3b9eff" />
          <StatsCard label="This Week" value={stats?.this_week ?? '—'} accent="#ffc53d" />
          <StatsCard
            label="Hero vs CTA"
            value={stats ? `${stats.hero_count} / ${stats.cta_count}` : '—'}
            sub="hero signups / cta signups"
            accent="#ff801f"
          />
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#464a4d]" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-sm pl-9 pr-4 text-[#fcfdff] placeholder-[#464a4d] text-sm font-ui focus:outline-none transition-all duration-200 rounded-lg"
            style={{
              background: '#0a0a0c',
              border: '1px solid rgba(255,255,255,0.1)',
              height: '36px',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
        </div>

        {/* Table */}
        <div className="surface-card overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-[#464a4d] text-sm font-ui">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-[#464a4d] text-sm font-ui">No signups yet</div>
          ) : (
            <table className="w-full min-w-[900px]">
              <thead style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <tr>
                  <th className={TH}>#</th>
                  <th className={TH}>Name</th>
                  <th className={TH}>Email</th>
                  <th className={TH}>Source</th>
                  <th className={TH}>Freelance Type</th>
                  <th className={TH}>Pain Point</th>
                  <th className={TH}>Current Tool</th>
                  <th className={TH}>Browser</th>
                  <th className={TH}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e, i) => (
                  <tr
                    key={e.id}
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                    className="hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                  >
                    <td className={TD}>
                      <span className="font-mono text-[#464a4d]">
                        {(page - 1) * perPage + i + 1}
                      </span>
                    </td>
                    <td className={TD}>
                      <span className="text-[#fcfdff]">{e.name}</span>
                    </td>
                    <td className={TD}>{e.email}</td>
                    <td className={TD}>
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-ui font-medium"
                        style={{
                          background: e.source === 'hero' ? 'rgba(59,158,255,0.1)' : 'rgba(255,128,31,0.1)',
                          color: e.source === 'hero' ? '#3b9eff' : '#ff801f',
                          border: `1px solid ${e.source === 'hero' ? 'rgba(59,158,255,0.25)' : 'rgba(255,128,31,0.25)'}`,
                        }}
                      >
                        {e.source === 'hero' ? 'Hero' : 'CTA'}
                      </span>
                    </td>
                    <td className={TD}>{e.freelance_type ?? '—'}</td>
                    <td className={TD}>{e.pain_point ?? '—'}</td>
                    <td className={TD}>{e.current_tool ?? '—'}</td>
                    <td className={TD}>{parseBrowser(e.user_agent)}</td>
                    <td className={TD + ' whitespace-nowrap'}>{formatDate(e.signed_up_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <span className="text-[11px] font-ui text-[#464a4d]">
              {total} total · page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="btn-ghost h-[30px] px-3 text-xs font-ui"
                style={{ opacity: page === 1 ? 0.4 : 1 }}
              >
                Prev
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="btn-ghost h-[30px] px-3 text-xs font-ui"
                style={{ opacity: page === totalPages ? 0.4 : 1 }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

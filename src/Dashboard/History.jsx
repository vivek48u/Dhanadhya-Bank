import React, { useEffect, useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, X, ChevronRight } from 'lucide-react'
import api from '../api/axios'

// Formats a number as Indian rupees, e.g. 1503500 -> ₹15,03,500.00
const money = (n) => {
  const value = Number(n)
  if (!Number.isFinite(value)) return '₹0.00'
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
    : '—'

const formatTime = (iso) =>
  iso
    ? new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
    : '—'

const statusStyle = {
  completed: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  failed: 'bg-red-50 text-red-700',
  reversed: 'bg-slate-100 text-slate-700',
}

const History = () => {
  const [history, setHistory] = useState([])
  const [filter, setFilter] = useState('all')   // all | sent | received
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)   // the transaction shown in the popup

  useEffect(() => {
    async function loadHistory() {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/api/transaction/history', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setHistory(res.data.history)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load history')
      } finally {
        setLoading(false)
      }
    }
    loadHistory()
  }, [])

  // Close the popup with the Escape key
  useEffect(() => {
    if (!selected) return
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  const visible = history.filter((t) => filter === 'all' || t.direction === filter)

  const look = {
    sent: { icon: ArrowUpRight, box: 'bg-orange-100 text-orange-700', amount: 'text-red-600', sign: '-', label: 'Sent to', title: 'Money sent', party: 'Sent to' },
    received: { icon: ArrowDownLeft, box: 'bg-green-100 text-green-700', amount: 'text-green-600', sign: '+', label: 'Received from', title: 'Money received', party: 'Received from' },
    self: { icon: ArrowLeftRight, box: 'bg-indigo-100 text-indigo-700', amount: 'text-slate-700', sign: '', label: 'Own transfer with', title: 'Own transfer', party: 'Between your accounts' },
  }

  const tabs = [
    { key: 'all', name: 'All' },
    { key: 'sent', name: 'Sent' },
    { key: 'received', name: 'Received' },
  ]

  const sel = selected ? look[selected.direction] : null
  const SelIcon = sel?.icon

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
        <p className="mt-1 text-slate-500">All your transfers in one place. Tap a transaction to see its details.</p>
      </div>

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              filter === t.key
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 bg-white text-slate-600 hover:bg-blue-50'
            }`}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-3">
        {loading && <p className="p-4 text-slate-500">Loading...</p>}
        {error && <p className="p-4 text-red-600">{error}</p>}
        {!loading && !error && visible.length === 0 && (
          <p className="p-4 text-center text-slate-500">No transactions found.</p>
        )}

        <div className="divide-y divide-slate-100">
          {visible.map((t) => {
            const v = look[t.direction]
            const Icon = v.icon
            return (
              <button
                key={t._id}
                onClick={() => setSelected(t)}
                className="flex w-full items-center gap-4 rounded-xl px-3 py-4 text-left transition hover:bg-blue-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${v.box}`}>
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">
                    {v.label} {t.otherName || 'Account'} •••• {t.otherAccountNumber?.slice(-4)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {t.createdAt ? new Date(t.createdAt).toLocaleString('en-IN') : ''}
                    {t.status !== 'completed' && ` · ${t.status}`}
                  </p>
                </div>

                <p className={`font-bold ${v.amount}`}>
                  {v.sign}{money(t.amount)}
                </p>
                <ChevronRight size={18} className="shrink-0 text-slate-400" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Transaction details popup */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${sel.box}`}>
                  <SelIcon size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">{sel.title}</h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-blue-50 p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Amount</p>
              <p className={`mt-1 text-3xl font-extrabold ${sel.amount}`}>
                {sel.sign}{money(selected.amount)}
              </p>
            </div>

            <div className="mt-4 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between gap-4 py-2.5">
                <span className="text-slate-500">Date</span>
                <span className="text-right font-semibold text-slate-900">{formatDate(selected.createdAt)}</span>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <span className="text-slate-500">Time</span>
                <span className="font-semibold text-slate-900">{formatTime(selected.createdAt)}</span>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <span className="text-slate-500">{sel.party}</span>
                <span className="text-right font-semibold text-slate-900">
                  {selected.otherName || 'Account'} •••• {selected.otherAccountNumber?.slice(-4)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-slate-500">Status</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                    statusStyle[selected.status] || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {selected.status}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-2.5">
                <span className="text-slate-500">Reference ID</span>
                <span className="font-mono font-semibold text-slate-900">
                  {String(selected._id).slice(-10).toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default History
import { useState } from 'react'
import { Landmark, Eye, EyeOff, CircleCheck, Star, Copy, Check, Snowflake, Clock } from 'lucide-react'
import balanceImage from '../assets/balance.jpg'

const STATUS = {
  active:  { label: 'Active',  cls: 'bg-emerald-50 text-emerald-700', Icon: CircleCheck },
  frozen:  { label: 'Frozen',  cls: 'bg-sky-50 text-sky-700',         Icon: Snowflake },
  dormant: { label: 'Dormant', cls: 'bg-amber-50 text-amber-700',     Icon: Clock },
}

// "123456789012" -> "1234 5678 9012"
const groupDigits = (num = '') => num.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()

const AccountCard = ({ account, onMakePrimary }) => {
  const [showFull, setShowFull] = useState(false)
  const [copied, setCopied] = useState(false)

  const status = STATUS[account.status?.toLowerCase()] || STATUS.active
  const StatusIcon = status.Icon
  const accountNumber = account.accountNumber || ''
  const last4 = accountNumber.slice(-4)

  const toggleFull = () => setShowFull((v) => !v)

  // stops inner buttons from also triggering the card click
  const stop = (fn) => (e) => {
    e.stopPropagation()
    fn?.()
  }

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard not available */
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleFull}
      onKeyDown={(e) => e.key === 'Enter' && toggleFull()}
      style={{ backgroundImage: `url(${balanceImage})` }}
      className={`group relative flex h-full min-h-[260px] cursor-pointer flex-col overflow-hidden rounded-2xl bg-cover bg-center p-5 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/30 sm:p-6 ${
        account.isPrimary
          ? 'ring-2 ring-amber-300/80 ring-offset-2 ring-offset-white'
          : 'border border-white/10'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-800/40 to-slate-950/80" />

      <div className="relative z-10 flex h-full flex-col">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-blue-600">
            <Landmark size={24} strokeWidth={1.8} />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {account.isPrimary && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1.5 text-xs font-semibold text-amber-950">
                <Star size={13} fill="currentColor" /> Primary
              </span>
            )}
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.cls}`}>
              <StatusIcon size={14} /> {status.label}
            </span>
          </div>
        </div>

        {/* Account type / nickname */}
        <div className="mt-6">
          <p className="text-base font-semibold text-white">
            {account.nickname || account.accountType || 'Bank account'}
          </p>
          {account.nickname && account.accountType && (
            <p className="text-xs text-white/70">{account.accountType}</p>
          )}
        </div>

        {/* Account number: masked by default, full after clicking View */}
        <div className="mt-4">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/70">
            Account number
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p
              className={`font-mono font-bold transition-all ${
                showFull ? 'text-xl tracking-[0.12em]' : 'text-2xl tracking-[0.15em]'
              }`}
            >
              {showFull ? groupDigits(accountNumber) : `•••• ${last4}`}
            </p>
            <button
              onClick={stop(copyNumber)}
              aria-label="Copy account number"
              className={`rounded-full p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white focus:opacity-100 ${
                showFull ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto flex gap-2 pt-6">
          <button
            onClick={stop(toggleFull)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            {showFull ? <EyeOff size={18} /> : <Eye size={18} />}
            {showFull ? 'Hide' : 'View'}
          </button>

          {account.isPrimary ? (
            <button
              disabled
              className="flex flex-1 cursor-default items-center justify-center gap-2 rounded-xl border border-amber-300/60 bg-amber-300/10 px-4 py-3 font-semibold text-amber-200"
            >
              <Check size={18} /> Primary
            </button>
          ) : (
            <button
              onClick={stop(() => onMakePrimary?.(account))}
              className="flex-1 rounded-xl border border-white/60 bg-transparent px-4 py-3 font-semibold text-white transition hover:bg-white/15"
            >
              Make primary
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountCard
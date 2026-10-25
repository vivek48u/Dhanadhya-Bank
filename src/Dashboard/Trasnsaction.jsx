import React, { useEffect, useState } from 'react'
import { ArrowLeftRight, ShieldCheck, CircleAlert, CircleCheck, Loader2 } from 'lucide-react'
import api from '../api/axios'

const inr = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n)

const accountLabel = (acc) =>
  `${acc.nickname || acc.accountType || 'Account'} •••• ${acc.accountNumber?.slice(-4)}${
    acc.isPrimary ? ' (Primary)' : ''
  }`

const groupDigits = (num = '') => num.replace(/(.{4})/g, '$1 ').trim()

const inputCls =
  'w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100'

const Transaction = () => {
  const [accounts, setAccounts] = useState([])
  const [loadingAccounts, setLoadingAccounts] = useState(true)
  const [fromAccount, setFromAccount] = useState('')
  const [toNumber, setToNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID())
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  const selected = accounts.find((a) => a._id === fromAccount)
  const isValid = fromAccount && toNumber.length === 8 && Number(amount) > 0

  // load my accounts for the "From" dropdown
  useEffect(() => {
    async function loadAccounts() {
      try {
        const res = await api.get('/api/account', { headers })
        const list = res.data.accounts
        setAccounts(list)
        const primary = list.find((a) => a.isPrimary) || list[0]
        if (primary) setFromAccount(primary._id)
      } catch (err) {
        setMessage({ type: 'error', text: 'Could not load your accounts.' })
      } finally {
        setLoadingAccounts(false)
      }
    }
    loadAccounts()
  }, [])

  // New details = new transaction = new key.
  // Same details (a retry after a failure) = same key, so money can't be sent twice.
  useEffect(() => {
    setIdempotencyKey(crypto.randomUUID())
  }, [fromAccount, toNumber, amount])

  const clearMessage = () => message.text && setMessage({ type: '', text: '' })

  // Step 1: validate, then open the review modal
  const handleReview = (e) => {
    e.preventDefault()
    if (loading) return

    if (!fromAccount) return setMessage({ type: 'error', text: 'Select a from account.' })
    if (toNumber.length !== 8)
      return setMessage({ type: 'error', text: 'Enter a valid 8 digit account number.' })
    if (selected?.accountNumber === toNumber)
      return setMessage({ type: 'error', text: 'You cannot transfer to the same account.' })
    if (!amount || Number(amount) <= 0)
      return setMessage({ type: 'error', text: 'Enter a valid amount.' })

    setMessage({ type: '', text: '' })
    setShowConfirm(true)
  }

  // Step 2: user confirmed, send it
  const handleConfirm = async () => {
    if (loading) return
    setLoading(true)

    try {
      const res = await api.post(
        '/api/transaction',
        {
          fromAccount,
          toAccountNumber: toNumber,
          amount: Number(amount),
          idempotencyKey,
        },
        { headers }
      )

      setMessage({ type: 'success', text: res.data.message || 'Transfer successful.' })
      setToNumber('')
      setAmount('')
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Transfer failed' })
    } finally {
      setLoading(false)
      setShowConfirm(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Transfer Money</h1>
        <p className="mt-1 text-slate-500">Send money between accounts securely.</p>
      </div>

      <form
        onSubmit={handleReview}
        className="space-y-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm shadow-blue-900/5 sm:p-8"
      >
        <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-blue-800">
          <ShieldCheck size={26} />
          <div>
            <h3 className="font-semibold">Secure Transfer</h3>
            <p className="text-sm text-blue-700">Review the details before submitting.</p>
          </div>
        </div>

        <div>
          <label htmlFor="from" className="mb-2 block text-sm font-semibold text-slate-700">
            From Account
          </label>
          <select
            id="from"
            value={fromAccount}
            onChange={(e) => {
              setFromAccount(e.target.value)
              clearMessage()
            }}
            disabled={loadingAccounts}
            className={inputCls}
            required
          >
            {loadingAccounts && <option>Loading accounts...</option>}
            {accounts.map((acc) => (
              <option key={acc._id} value={acc._id}>
                {accountLabel(acc)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="to" className="mb-2 block text-sm font-semibold text-slate-700">
            To Account Number
          </label>
          <input
            id="to"
            value={toNumber}
            onChange={(e) => {
              setToNumber(e.target.value.replace(/\D/g, '').slice(0, 8))
              clearMessage()
            }}
            placeholder="Enter 8 digit account number"
            inputMode="numeric"
            autoComplete="off"
            className={`${inputCls} font-mono tracking-wider`}
            required
          />
          <p className="mt-1 text-xs text-slate-400">{toNumber.length}/8 digits</p>
        </div>

        <div>
          <label htmlFor="amount" className="mb-2 block text-sm font-semibold text-slate-700">
            Amount
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-500">
              ₹
            </span>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                clearMessage()
              }}
              onWheel={(e) => e.currentTarget.blur()}
              placeholder="0.00"
              className={`${inputCls} pl-9 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              required
            />
          </div>
        </div>

        {message.text && (
          <div
            role="alert"
            aria-live="polite"
            className={`flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
              message.type === 'error'
                ? 'bg-red-50 text-red-700'
                : 'bg-emerald-50 text-emerald-700'
            }`}
          >
            {message.type === 'error' ? <CircleAlert size={18} /> : <CircleCheck size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
        >
          <ArrowLeftRight size={19} />
          Continue Transfer
        </button>
      </form>

      {/* Review modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => !loading && setShowConfirm(false)}
        >
          <div
            className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-slate-900">Confirm transfer</h2>
            <p className="mt-1 text-sm text-slate-500">Please check the details carefully.</p>

            <p className="mt-5 break-words text-3xl font-bold text-blue-700">{inr(Number(amount))}</p>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">From</dt>
                <dd className="break-words text-right font-semibold text-slate-800">
                  {selected && accountLabel(selected)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">To account</dt>
                <dd className="font-mono font-semibold tracking-wider text-slate-800">
                  {groupDigits(toNumber)}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-col-reverse gap-3 min-[400px]:flex-row">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  'Confirm & Send'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Transaction
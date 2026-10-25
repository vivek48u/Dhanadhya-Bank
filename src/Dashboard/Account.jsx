import React, { useEffect, useState } from 'react'
import { Wallet, Plus, CircleCheck, Copy, Check, X } from 'lucide-react'
import AccountCard from './AccountCard'
import api from '../api/axios'

const Account = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isPrimary, setIsPrimary] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [modal, setModal] = useState(null)      // { mode: 'created' | 'view', account }
  const [copied, setCopied] = useState(false)

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  // Load accounts
  const fetchAccountData = async () => {
    try {
      const response = await api.get('/api/account', { headers })
      setAccounts(response.data.accounts)
    } catch (err) {
      console.error('Account fetch error:', err)
      setError(err.response?.data?.message || 'Failed to fetch accounts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAccountData()
  }, [])

  // Close the popup with the Escape key
  useEffect(() => {
    if (!modal) return
    const onKey = (e) => e.key === 'Escape' && setModal(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal])

  // Create account, then show its details in the popup
  async function handleCreate() {
    if (creating) return          // stops double clicks creating two accounts
    setCreating(true)
    setCreateError('')

    try {
      const res = await api.post('/api/account', { isPrimary }, { headers })
      setModal({ mode: 'created', account: res.data.account })
      setIsPrimary(false)
      fetchAccountData()
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Could not create the account')
    } finally {
      setCreating(false)
    }
  }

  async function handleMakePrimary(account) {
    try {
      await api.patch(`/api/account/${account._id}/primary`, {}, { headers })
      fetchAccountData()
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  // View uses the same popup
  const handleView = (account) => setModal({ mode: 'view', account })

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(modal.account.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      console.log('Copy failed:', err.message)
    }
  }

  const acc = modal?.account
  const created = acc?.createdAt
    ? new Date(acc.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    : '—'

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-5 text-white shadow-lg shadow-blue-900/10 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
            <Wallet size={26} />
          </div>
          <div>
            <h2 className="text-lg font-bold">Manage your accounts</h2>
            <p className="text-sm text-blue-100">
              {accounts.length} linked {accounts.length === 1 ? 'account' : 'accounts'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={(e) => setIsPrimary(e.target.checked)}
              className="h-4 w-4"
            />
            Make new account primary
          </label>

          <button
            type="button"
            onClick={handleCreate}
            disabled={creating}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 shadow-md transition hover:bg-blue-50 disabled:opacity-60 sm:w-auto"
          >
            <Plus size={19} /> {creating ? 'Creating...' : 'Create Account'}
          </button>
        </div>
      </div>

      {createError && <p className="text-red-600">{createError}</p>}
      {loading && <p className="text-slate-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && accounts.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center sm:p-10">
          <p className="font-semibold text-slate-700">No accounts yet</p>
          <p className="mt-1 text-sm text-slate-500">Create your first account to get started.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard
            key={account._id}
            account={account}
            onView={handleView}
            onMakePrimary={handleMakePrimary}
          />
        ))}
      </div>

      {/* Popup */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {modal.mode === 'created' && (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CircleCheck size={24} />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {modal.mode === 'created' ? 'Account created' : 'Account details'}
                  </h2>
                  {modal.mode === 'created' && (
                    <p className="text-sm text-slate-500">Your new account is ready to use.</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setModal(null)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-blue-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Account number</p>
              <div className="mt-1 flex items-center justify-between gap-3">
                <p className="min-w-0 break-all text-xl font-bold tracking-wider text-slate-900 sm:text-2xl">{acc.accountNumber}</p>
                <button
                  onClick={copyNumber}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="mt-4 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Account type</span>
                <span className="font-semibold text-slate-900">{acc.accountType || 'Bank account'}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Primary account</span>
                <span className="font-semibold text-slate-900">{acc.isPrimary ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-emerald-700">{acc.status || 'Active'}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Created on</span>
                <span className="font-semibold text-slate-900">{created}</span>
              </div>
            </div>

            <button
              onClick={() => setModal(null)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {modal.mode === 'created' ? 'Done' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account
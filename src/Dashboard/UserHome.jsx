import React, { useState, useEffect } from 'react'
import { ArrowUpRight, ArrowDownLeft, CreditCard, Eye, Send, Wallet, X } from 'lucide-react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import balanceImage from '../assets/balance.jpg'

// Formats a number as Indian rupees, e.g. 1503500 -> ₹15,03,500.00
const money = (n) => {
  const value = Number(n)
  if (!Number.isFinite(value)) return '₹0.00'
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const Home = ({User}) => {
  const navigate = useNavigate()
  const ctx = useOutletContext()
  const user = ctx?.user ?? ctx?.User   // works with either prop name

  const [balance, setBalance] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [summary, setSummary] = useState({ moneySent: 0, moneyReceived: 0 })
  const [activeType, setActiveType] = useState(null)   // 'debit' or 'credit'
  const [entries, setEntries] = useState([])
  const [entriesLoading, setEntriesLoading] = useState(false)

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  // Load accounts and the sent/received totals
  useEffect(() => {
    async function loadAccounts() {
      try {
        const res = await api.get('/api/account', { headers })
        setAccounts(res.data.accounts)
      } catch (err) {
        console.log(err.response?.data || err.message)
      }
    }

    async function loadSummary() {
      try {
        const res = await api.get('/api/transaction/stats', { headers })
        setSummary({
          moneySent: res.data.moneySent || 0,
          moneyReceived: res.data.moneyReceived || 0,
        })
      } catch (err) {
        console.log(err.response?.data || err.message)
      }
    }

    loadAccounts()
    loadSummary()
  }, [])

  async function checkBalance() {
    try {
      const res = await api.get('/api/account/primary/balance', { headers })
      setBalance(res.data.balance)
    } catch (err) {
      console.log(err.response?.data || err.message)
    }
  }

  async function showEntries(type) {
    // clicking the same card again closes the list
    if (activeType === type) {
      setActiveType(null)
      return
    }

    setActiveType(type)
    setEntriesLoading(true)
    try {
      const res = await api.get(`/api/transaction/entries?type=${type}`, { headers })
      setEntries(res.data.entries)
    } catch (err) {
      console.log(err.response?.data || err.message)
      setEntries([])
    } finally {
      setEntriesLoading(false)
    }
  }

  const stats = [
    { title: 'Total Accounts', amount: String(accounts.length), icon: CreditCard, color: 'bg-indigo-100 text-indigo-700', to: '/app/account', link: 'View accounts →' },
    { title: 'Money Sent', type: 'debit', amount: money(summary.moneySent), icon: ArrowUpRight, color: 'bg-orange-100 text-orange-700', link: 'View entries →' },
    { title: 'Money Received', type: 'credit', amount: money(summary.moneyReceived), icon: ArrowDownLeft, color: 'bg-green-100 text-green-700', link: 'View entries →' },
  ]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{greeting}, {User?.name} ✌️</h1>
        <p className="mt-1 text-slate-500">Here's an overview of your finances.</p>
      </div>

      {/* Balance card */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(10,31,92,0.25), rgba(10,31,92,0.25)), url(${balanceImage})`,
        }}
        className="flex w-full flex-col gap-2 rounded-2xl bg-cover bg-center bg-no-repeat p-5 shadow-xl shadow-blue-900/20 sm:p-6 lg:p-8"
      >
        <span className="font-bold text-white">Total Balance</span>
        <h1 className="break-words text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {balance !== null ? money(balance?.balance ?? balance) : '₹ ••••••'}
        </h1>

        <div className="mt-4 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
          <button
            onClick={checkBalance}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/60 bg-white/10 px-3 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:px-6 sm:text-base"
          >
            <Eye size={20} className="shrink-0" />
            Check Balance
          </button>

          <button
            onClick={() => navigate('/app/transfer')}
            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white px-3 py-3 text-sm font-semibold text-blue-700 shadow-md transition hover:bg-blue-50 sm:px-6 sm:text-base"
          >
            <Send size={20} className="shrink-0" />
            Send Money
          </button>

          <button
            onClick={() => navigate('/app/account')}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 min-[420px]:col-span-2 sm:col-span-1 sm:px-6 sm:text-base"
          >
            <Wallet size={20} />
            Accounts
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon
          const isActive = activeType && activeType === item.type

          return (
            <div
              key={item.title}
              onClick={() => {
                if (item.type) showEntries(item.type)
                else if (item.to) navigate(item.to)
              }}
              className={`flex min-w-0 cursor-pointer items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm shadow-blue-900/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10 ${
                isActive ? 'border-blue-500' : 'border-slate-100'
              }`}
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-slate-500">{item.title}</p>
                <h2 className="break-words text-xl font-bold text-slate-900 sm:text-2xl">{item.amount}</h2>
                <p className="mt-1 text-sm font-semibold text-blue-600">{item.link}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Entries list */}
      {activeType && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {activeType === 'debit' ? 'Sent (Debit) Entries' : 'Received (Credit) Entries'}
            </h2>
            <button
              onClick={() => setActiveType(null)}
              aria-label="Close list"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          {entriesLoading && <p className="mt-3 text-slate-500">Loading...</p>}

          {!entriesLoading && entries.length === 0 && (
            <p className="mt-3 text-slate-500">No entries found.</p>
          )}

          <div className="mt-4 divide-y divide-slate-100">
            {entries.map((e) => (
              <div key={e._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-semibold text-slate-800">
                    Account •••• {e.account?.accountNumber?.slice(-4)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {e.createdAt ? new Date(e.createdAt).toLocaleString() : ''}
                  </p>
                </div>
                <p className={`shrink-0 pl-3 font-bold ${activeType === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                  {activeType === 'debit' ? '-' : '+'}{money(e.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom banner */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white shadow-lg shadow-blue-900/10 before:pointer-events-none before:absolute before:-right-12 before:-top-12 before:h-48 before:w-48 before:rounded-full before:bg-white/10 after:pointer-events-none after:absolute after:-bottom-16 after:right-16 after:h-40 after:w-40 after:rounded-full after:bg-white/5 sm:p-10">
        <p className="text-sm text-blue-100">Your finances, all in one place</p>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Banking made simpler.</h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100">
          Manage your accounts, transfer money and review your transaction history from one dashboard.
        </p>
      </div>
    </div>
  )
}

export default Home
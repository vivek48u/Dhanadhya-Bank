import { useState } from 'react'
import api from '../api/axios'
const AddFunds = () => {
 
  const [toNumber, setToNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [idempotencyKey, setIdempotencyKey] = useState(crypto.randomUUID())
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    if (toNumber.length !== 8 || Number(amount) <= 0) {
      return setMessage({ type: 'error', text: 'Enter a valid account number and amount.' })
    }

    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const res = await api.post(
        '/api/transaction/system/intial-funds',
        { toAccountNumber: toNumber, amount: Number(amount), idempotencyKey },
        { headers }
        
      )
      setMessage({ type: 'success', text: res.data.message })
      setToNumber('')
      setAmount('')
      setIdempotencyKey(crypto.randomUUID())   // new key after success
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to add funds' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Add Funds</h1>
        <p className="mt-1 text-slate-500">Add starting money to a user's account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-blue-900/5 sm:p-8">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Receiver Account Number</label>
          <input
            value={toNumber}
            onChange={(e) => setToNumber(e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder="8 digit account number"
            inputMode="numeric"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Amount (₹)</label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {message.text && (
          <p className={message.type === 'error' ? 'text-red-600' : 'text-green-700'}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
        >
          {loading ? 'Adding...' : 'Add Funds'}
        </button>
      </form>
    </div>
  )
}

export default AddFunds
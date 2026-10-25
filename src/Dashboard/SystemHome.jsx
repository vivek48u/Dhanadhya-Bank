import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Landmark, CirclePlus, History } from 'lucide-react'
import api from '../api/axios'

const SystemHome = ({ user }) => {
  const navigate = useNavigate()
  const [issued, setIssued] = useState(null)

  useEffect(() => {
    async function loadIssued() {
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/api/account/primary/balance', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const b = res.data.balance
        const amount = typeof b === 'object' ? b.balance : b
        setIssued(Math.abs(Number(amount)))   // minus ko positive dikhao
      } catch (err) {
        console.log(err.response?.data || err.message)
      }
    }
    loadIssued()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Hello, {user?.name}</h1>
        <p className="mt-1 text-slate-500">System control panel.</p>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-5 shadow-lg shadow-blue-900/10 sm:p-6">
        <div className="flex items-center gap-2 text-gray-100 font-semibold">
          <Landmark size={20} /> Total funds issued
        </div>
        <h1 className="mt-2 break-words text-3xl font-extrabold text-white sm:text-5xl">
          {issued !== null ? `₹${issued.toLocaleString('en-IN')}` : '₹ ****'}
        </h1>
        <p className="mt-2 text-sm text-blue-100">
          Total money the bank has issued to users.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <button
          onClick={() => navigate('/app/add-funds')}
          className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm shadow-blue-900/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10 sm:p-6"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <CirclePlus size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-900">Add funds</p>
            <p className="text-sm text-slate-500">Deposit money into any account</p>
          </div>
        </button>

        <button
          onClick={() => navigate('/app/history')}
          className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm shadow-blue-900/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/10 sm:p-6"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
            <History size={24} />
          </div>
          <div>
            <p className="font-bold text-slate-900">History</p>
            <p className="text-sm text-slate-500">View all funds issued so far</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default SystemHome

import React from 'react'
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  TrendingUp
} from 'lucide-react'

const HeroRight = () => {
  return (
    <div className="relative hidden w-full max-w-sm p-5 lg:block">

      {/* Balance Card */}
      <div className="rounded-3xl border border-white/70 bg-white/85 p-6 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-2">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Wallet size={25} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Banking Overview
              </p>
              <h2 className="font-bold text-slate-900">
                My Account
              </h2>
            </div>
          </div>

          <ShieldCheck size={24} className="text-emerald-500" />
        </div>

        <div className="mt-7 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-500 p-5 text-white shadow-lg">
          <p className="text-sm text-blue-100">
            Available Balance
          </p>

          <h1 className="mt-2 text-3xl font-extrabold">
            ₹••,•••
          </h1>

          <div className="mt-4 flex items-center gap-2 text-sm text-blue-100">
            <ShieldCheck size={17} />
            <span>Your money, your control</span>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="mt-6">
          <h3 className="font-bold text-slate-900">
            Quick Overview
          </h3>

          <div className="mt-4 flex items-center justify-between rounded-xl p-3 transition hover:bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <ArrowDownLeft size={22} />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Money Received
                </p>
                <p className="text-xs text-slate-500">
                  Incoming transfer
                </p>
              </div>
            </div>

            <span className="text-sm font-bold text-emerald-600">
              Credit
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between rounded-xl p-3 transition hover:bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <ArrowUpRight size={22} />
              </div>

              <div>
                <p className="font-semibold text-slate-800">
                  Money Transfer
                </p>
                <p className="text-xs text-slate-500">
                  Outgoing transfer
                </p>
              </div>
            </div>

            <span className="text-sm font-bold text-blue-600">
              Debit
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
          <TrendingUp size={18} className="text-blue-600" />
          Manage your finances with ease
        </div>

      </div>
    </div>
  )
}

export default HeroRight

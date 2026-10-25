
import React from 'react'
import service from '../assets/Services.png'
import Navbar from './Navbar'
import {
  Send,
  Wallet,
  ReceiptText,
  ShieldCheck,
  CreditCard,
  ChartNoAxesColumnIncreasing
} from 'lucide-react'

const Service = () => {

  const services = [
    {
      icon: Send,
      title: 'Money Transfer',
      description: 'Send and receive money between accounts with a simple and convenient experience.'
    },
    {
      icon: Wallet,
      title: 'Account Management',
      description: 'Manage your account details and view your available balance easily.'
    },
    {
      icon: ReceiptText,
      title: 'Transaction History',
      description: 'View your transaction records and keep track of your financial activity.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Banking',
      description: 'Enjoy a banking experience designed around secure account access.'
    },
    {
      icon: CreditCard,
      title: 'Bill Payments',
      description: 'Manage bill payments conveniently whenever this feature is available.'
    },
    {
      icon: ChartNoAxesColumnIncreasing,
      title: 'Financial Insights',
      description: 'Understand your financial activity and keep track of your transactions.'
    }
  ]

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${service})` }}
    >
      <Navbar />

      <div className="mx-auto mb-12 max-w-7xl px-5 pt-10 text-center md:pt-14">
        <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold tracking-wider text-blue-600">
          OUR SERVICES
        </span>

        <h1 className="mt-5 text-3xl font-extrabold text-slate-900 md:text-5xl">
          Modern Banking Services for a
          <span className="block text-blue-600">
            Brighter Tomorrow
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          Dhanadhya Finance offers a complete range of digital banking services
          designed to make your financial journey simple, secure and convenient.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-md backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
                <Icon size={30} strokeWidth={1.8} />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                {item.description}
              </p>

              <div className="mt-5 flex items-center gap-2 font-semibold text-blue-600 transition group-hover:gap-3">
                <span>Learn More</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Service

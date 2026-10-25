
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

      <div className="mx-auto mb-10 max-w-7xl px-5 pt-10 text-center md:mb-12 md:pt-14">
        <span className="inline-block rounded-full bg-blue-100/95 px-5 py-2 text-sm font-semibold tracking-wider text-blue-600 shadow-sm">
          OUR SERVICES
        </span>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Modern Banking Services for a
          <span className="block text-blue-600">
            Brighter Tomorrow
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl rounded-2xl bg-white/60 p-3 text-base leading-7 text-slate-700 backdrop-blur-sm sm:bg-transparent sm:p-0 sm:backdrop-blur-none md:text-lg">
          Dhanadhya Finance offers a complete range of digital banking services
          designed to make your financial journey simple, secure and convenient.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-5 pb-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:px-8">
        {services.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="group rounded-2xl border border-blue-100 bg-white/90 p-5 shadow-md shadow-blue-900/5 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10 sm:p-6"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white sm:mb-5 sm:h-16 sm:w-16">
                <Icon size={30} strokeWidth={1.8} />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 sm:min-h-[72px]">
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

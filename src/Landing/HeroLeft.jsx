
import React from 'react'
import { Link } from 'react-router-dom'

const HeroLeft = () => {
  return (
    <div className="w-full max-w-xl px-5 py-10 sm:px-8 md:ml-10 md:py-12 lg:ml-15">

      <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
        Online Banking - Open 24/7
      </span>

      <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl">
        Grow Your Wealth With a Bank That{' '}
        <span className="text-blue-600">
          Moves at Your Pace
        </span>
      </h1>

      <p className="mt-5 max-w-lg text-base font-medium leading-7 text-slate-600 sm:text-lg">
        Dhanadhya means prosperous. Open an account in minutes,
        track every rupee, and send money instantly to any
        Dhanadhya account.
      </p>

      <Link
        to="/register"
        className="mt-7 inline-flex items-center justify-center rounded-full bg-sky-800 px-7 py-3.5 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-sky-900 hover:shadow-lg"
      >
        Open Your Account Now!
        <span className="ml-2" aria-hidden="true">→</span>
      </Link>

    </div>
  )
}

export default HeroLeft

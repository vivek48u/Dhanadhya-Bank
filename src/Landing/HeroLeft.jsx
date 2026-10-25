
import React from 'react'
import { Link } from 'react-router-dom'

const HeroLeft = () => {
  return (
    <div className="relative z-10 w-full max-w-xl px-5 py-10 sm:px-8 md:ml-10 md:py-12 lg:ml-15">

      <span className="inline-block rounded-full border border-blue-200/70 bg-blue-100/90 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
        Online Banking - Open 24/7
      </span>

      <h1 className="mt-5 text-[2.1rem] font-extrabold leading-[1.1] tracking-tight text-blue-950 min-[400px]:text-4xl sm:text-5xl">
        Grow Your Wealth With a Bank That{' '}
        <span className="text-blue-600">
          Moves at Your Pace
        </span>
      </h1>

      <p className="mt-5 max-w-lg text-base font-medium leading-7 text-slate-700 sm:text-lg sm:leading-8">
        Dhanadhya means prosperous. Open an account in minutes,
        track every rupee, and send money instantly to any
        Dhanadhya account.
      </p>

      <Link
        to="/register"
        className="mt-7 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-800 to-blue-700 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-300 hover:-translate-y-1 hover:from-sky-900 hover:to-blue-800 hover:shadow-xl sm:inline-flex sm:w-auto sm:py-3.5"
      >
        Open Your Account Now!
        <span className="ml-2" aria-hidden="true">→</span>
      </Link>

    </div>
  )
}

export default HeroLeft

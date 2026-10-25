
import React from 'react'
import about from '../assets/About.png'
import Navbar from './Navbar'
import { CircleCheck, Eye, UsersRound } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: CircleCheck,
      title: 'Our Mission',
      description:
        'To empower people with simple, secure, and innovative financial solutions.',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description:
        'To become a trusted digital banking partner for a financially stronger tomorrow.',
    },
    {
      icon: UsersRound,
      title: 'Our Values',
      description:
        'Trust, security, innovation, and a customer-first approach.',
    },
  ]

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${about})` }}
    >
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 md:py-12">
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
            About Us
          </span>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-blue-950 sm:text-4xl md:text-5xl">
            Building a Smarter Financial{' '}
            <span className="text-blue-600">
              Future Together
            </span>
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">
            Dhanadhya Finance is a modern digital banking platform
            built to make financial services simple, secure, and
            accessible. We combine technology with trust to help
            people manage their money, track transactions, and
            achieve their financial goals.
          </p>
        </div>

        <div className="mt-8 flex max-w-xl flex-col gap-4">
          {features.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="group flex items-start gap-4 rounded-2xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:bg-white/95 hover:shadow-lg sm:p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600 transition duration-300 group-hover:bg-sky-600 group-hover:text-white">
                  <Icon size={25} strokeWidth={2} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-sky-950 sm:text-xl">
                    {item.title}
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-600 sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default About

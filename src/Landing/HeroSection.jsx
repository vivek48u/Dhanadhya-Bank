import React from 'react'
import HeroLeft from './HeroLeft'
import bank from '../assets/Bank.png'
import HeroRight from './HeroRight'

const HeroSection = () => {
  return (
    <div
       className="relative flex min-h-[calc(100svh-4rem)] items-start bg-cover bg-[position:76%_bottom] bg-no-repeat before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/95 before:via-white/70 before:to-white/0 sm:bg-[position:70%_bottom] lg:min-h-[calc(100svh-5rem)] lg:items-center lg:bg-center lg:before:hidden"
     style={{ backgroundImage: `url(${bank})` }}
     >
        <HeroLeft />
    </div>
  )
}

export default HeroSection
import React from 'react'
import HeroLeft from './HeroLeft'
import bank from '../assets/Bank.png'
import HeroRight from './HeroRight'

const HeroSection = () => {
  return (
    <div
       className="h-screen bg-cover bg-center bg-no-repeat"
     style={{ backgroundImage: `url(${bank})` }}
     >
        <HeroLeft />
    </div>
  )
}

export default HeroSection
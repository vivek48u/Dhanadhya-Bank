import React from 'react'
import Navbar from './Landing/Navbar'
import HeroSection from './Landing/HeroSection'
import Home from './Landing/Home'
import About from './Landing/About'
import Service from './Landing/Service'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Authentication/Login'
import Register from './Authentication/Register'
import UserNav from './Dashboard/UserNav'
import UserSidebar from './Dashboard/UserSidebar'
import UserDashboard from './Dashboard/UserDashboard'
import Account from './Dashboard/Account'
import Trasnsaction from './Dashboard/Trasnsaction'
import History from './Dashboard/History'
import UserHome from './Dashboard/UserHome'
import AddFunds from './Dashboard/AddFunds'
import DashHome from './Dashboard/DashHome'

const App = () => {
  return (
    
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />



        <Route path='/app' element={<UserDashboard />}>
          <Route index element={<DashHome />}/>
          <Route path='account' element={<Account />}/>
          <Route path='transfer' element={<Trasnsaction />}/>
          <Route path='history' element={<History />}/>
          <Route path="add-funds" element={<AddFunds />} />
        </Route>
      </Routes>
    

   

    
   
  )
}

export default App
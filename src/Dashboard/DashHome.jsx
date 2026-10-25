import React from 'react'
import { useOutletContext } from 'react-router-dom'
import UserHome from './UserHome'
import SystemHome from './SystemHome'

const Home = () => {
  const ctx = useOutletContext()
  const user = ctx?.user ?? ctx?.User

  if (!user) return <p className="text-slate-500">Loading...</p>

  return user.systemUser ? <SystemHome user={user} /> : <UserHome />
}

export default Home
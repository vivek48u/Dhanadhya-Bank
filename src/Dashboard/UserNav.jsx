import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Landmark, LogOut } from 'lucide-react'
import api from '../api/axios'

const UserNav = ({ user, User }) => {
  const navigate = useNavigate()
  const currentUser = user ?? User   // works with either prop name

  const initials = (currentUser?.name || 'U')
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  async function handleLogout() {
    const response= await api.post('/api/auth/logout')
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }

  

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-blue-500/40 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 shadow-md shadow-blue-900/10">
      <div className="mx-auto flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

        {/* Logo and brand */}
        <Link to="/app" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
            <Landmark size={22} strokeWidth={2.2} />
          </div>

          <h1 className="truncate text-lg font-extrabold tracking-tight text-white sm:text-xl">
            Dhanadhya <span className="text-sky-200">Finance</span>
          </h1>
        </Link>

        {/* User and logout */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-700 ring-2 ring-white/30">
              {initials}
            </div>

            <div className="hidden leading-tight sm:block">
              <p className="text-xs font-medium text-blue-100">Welcome back,</p>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">{currentUser?.name}</h2>
                {currentUser?.systemUser && (
                  <span className="rounded-full bg-sky-300 px-2 py-0.5 text-[10px] font-bold text-blue-950">
                    System
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            type="button"
            aria-label="Logout"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 active:scale-95 sm:px-4"
          >
            <LogOut size={17} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default UserNav
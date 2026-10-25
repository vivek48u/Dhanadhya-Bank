import React from 'react'
import { NavLink } from 'react-router-dom'
import sidebar from '../assets/sidebar.png'
import {
  House,
  Wallet,
  ArrowLeftRight,
  History,
  CirclePlus
} from 'lucide-react'

const UserSidebar = ({ User }) => {
  const menuItems = User?.systemUser
    ? [
        { name: 'Home', path: '/app', icon: House },
        { name: 'Add Funds', path: '/app/add-funds', icon: CirclePlus },
        { name: 'History', path: '/app/history', icon: History },
      ]
    : [
        { name: 'Home', path: '/app', icon: House },
        { name: 'Account', path: '/app/account', icon: Wallet },
        { name: 'Transfer', path: '/app/transfer', icon: ArrowLeftRight },
        { name: 'History', path: '/app/history', icon: History },
      ]

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside
        style={{ backgroundImage: `url(${sidebar})` }}
        className="hidden h-full w-56 shrink-0 flex-col border-r border-blue-100 bg-cover bg-center p-4 md:flex lg:w-64"
      >
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/app'}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                      : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                  }`
                }
              >
                <Icon size={21} strokeWidth={2} />
                <span>{item.name}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom card */}
        <div className="mt-auto rounded-2xl border border-blue-300 p-4">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/50 text-blue-900">
            <Wallet size={20} />
          </div>

          <h3 className="text-sm font-bold">Dhanadhya Finance</h3>
          <p className="mt-1 text-xs leading-5">Your money, managed smarter.</p>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-blue-100 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] font-semibold transition-colors ${
                  isActive ? 'text-blue-700' : 'text-slate-500 hover:text-blue-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-14 items-center justify-center rounded-full transition-colors ${
                      isActive ? 'bg-blue-100' : ''
                    }`}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.4 : 2} />
                  </span>
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}

export default UserSidebar
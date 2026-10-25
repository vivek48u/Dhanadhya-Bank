import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
]

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const closeMenu = () => setOpen(false)

    return (
        <nav className='sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-md'>
            <div className='mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-2 lg:px-8'>
                {/* Logo */}
                <Link to='/' onClick={closeMenu} className='flex min-w-0 shrink-0 items-center gap-2'>
                    <img src={Logo} alt='Logo' className='h-11 w-16 shrink-0 object-contain sm:h-12 sm:w-20 lg:h-14 lg:w-24' />
                    <h1 className='whitespace-nowrap text-base font-bold tracking-tight text-slate-900 min-[400px]:text-lg sm:text-xl lg:text-2xl'>
                        Dhanadhya <span className='text-blue-800'>Finance</span>
                    </h1>
                </Link>

                {/* Desktop links */}
                <ul className='hidden lg:flex items-center gap-9 font-semibold text-slate-700'>
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to} className='relative py-1 transition-colors hover:text-blue-700 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-blue-600 after:transition-transform after:duration-200 hover:after:scale-x-100'>{label}</Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop auth buttons */}
                <div className='hidden lg:flex items-center gap-3 font-semibold'>
                    <Link to='/login' className='rounded-full border-2 border-sky-700 px-5 py-1.5 text-sky-800 transition hover:bg-sky-700 hover:text-white'>Login</Link>
                    <Link to='/register' className='rounded-full border-2 border-sky-700 bg-sky-700 px-5 py-1.5 text-white shadow-sm transition hover:border-sky-800 hover:bg-sky-800'>Register</Link>
                </div>

                {/* Hamburger button (mobile only) */}
                <button
                    onClick={() => setOpen(!open)}
                    className='-mr-2 flex h-11 w-11 items-center justify-center rounded-xl text-slate-800 transition hover:bg-slate-100 lg:hidden'
                    aria-label='Toggle menu'
                    aria-expanded={open}
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className='max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-5 shadow-lg lg:hidden'>
                    <ul className='flex flex-col font-semibold'>
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    onClick={closeMenu}
                                    className='block border-b border-slate-100 py-3.5 text-slate-700 transition-colors hover:text-blue-700'
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='mt-4 flex flex-col gap-3 font-semibold sm:flex-row'>
                        <Link
                            to='/login'
                            onClick={closeMenu}
                            className='rounded-full border-2 border-sky-700 px-4 py-2.5 text-center text-sky-800 transition hover:bg-sky-700 hover:text-white sm:flex-1'
                        >
                            Login
                        </Link>
                        <Link
                            to='/register'
                            onClick={closeMenu}
                            className='rounded-full border-2 border-sky-700 bg-sky-700 px-4 py-2.5 text-center text-white transition hover:bg-sky-800 sm:flex-1'
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
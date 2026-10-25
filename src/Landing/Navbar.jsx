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
        <nav className='sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm'>
            <div className='flex items-center justify-between px-4 py-2 md:px-8'>
                {/* Logo */}
                <Link to='/' onClick={closeMenu} className='flex items-center gap-2'>
                    <img src={Logo} alt='Logo' className='h-12 w-12 md:h-16 md:w-16 object-contain' />
                    <h1 className='font-bold text-lg sm:text-xl md:text-2xl'>
                        Dhanadhya <span className='text-blue-800'>Finance</span>
                    </h1>
                </Link>

                {/* Desktop links */}
                <ul className='hidden md:flex items-center gap-9 font-semibold'>
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link to={to} className='hover:text-blue-700'>{label}</Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop auth buttons */}
                <div className='hidden md:flex items-center gap-5 font-semibold'>
                    <Link to='/login' className='border-2 border-sky-700 rounded px-4 py-1 hover:bg-sky-700 hover:text-white'>Login</Link>
                    <Link to='/register' className='border-2 border-sky-700 rounded px-4 py-1 hover:bg-sky-700 hover:text-white'>Register</Link>
                </div>

                {/* Hamburger button (mobile only) */}
                <button
                    onClick={() => setOpen(!open)}
                    className='md:hidden p-2 rounded hover:bg-gray-100'
                    aria-label='Toggle menu'
                    aria-expanded={open}
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className='md:hidden border-t border-gray-200 bg-white px-4 pb-4'>
                    <ul className='flex flex-col font-semibold'>
                        {navLinks.map(({ to, label }) => (
                            <li key={to}>
                                <Link
                                    to={to}
                                    onClick={closeMenu}
                                    className='block py-3 border-b border-gray-100 hover:text-blue-700'
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-col gap-3 mt-4 font-semibold'>
                        <Link
                            to='/login'
                            onClick={closeMenu}
                            className='text-center border-2 border-sky-700 rounded px-4 py-2 hover:bg-sky-700 hover:text-white'
                        >
                            Login
                        </Link>
                        <Link
                            to='/register'
                            onClick={closeMenu}
                            className='text-center border-2 border-sky-700 rounded px-4 py-2 hover:bg-sky-700 hover:text-white'
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
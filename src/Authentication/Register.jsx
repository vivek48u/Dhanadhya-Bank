
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import register from '../assets/register.png'
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Landmark,
  ShieldCheck,
} from 'lucide-react'


const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const [Loading,setLoading]=useState(false)
 

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }


    // Connect your Express registration API here.

  try {
    const response = await api.post('/api/auth/register', {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
    })

    console.log('Registration response:', response.data)

    // Registration successful: login page par jao.
    navigate('/login', {
      state: { message: 'Registration successful. Please log in.' },
    })
  } catch (err) {
    console.error(
      'Registration error:',
      err.response?.data || err.message
    )

    setError(
      err.response?.data?.message ||
      'Registration failed. Please try again.'
    )
  } finally {
    setLoading(false)
  }
    setError('Connect this form to your backend registration API.')
  }


  

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* LEFT SIDE: REGISTER FORM */}
      <section className="flex min-h-screen items-center justify-center px-5  lg:py-8 sm:px-10 lg:px-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <Landmark size={27} />
            </div>

            <div>
              <h2 className="text-xl font-extrabold tracking-wide text-blue-950">
                DHANADHYA
              </h2>
              <p className="text-xs font-semibold tracking-[0.35em] text-blue-600">
                FINANCE
              </p>
            </div>
          </Link>

          {/* Heading */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <ShieldCheck size={16} />
              Secure Banking
            </span>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-blue-950">
              Create Your <span className="text-blue-600">Account</span>
            </h1>

            <p className="mt-3 leading-7 text-slate-500">
              Join Dhanadhya Finance and manage your money with confidence.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-semibold text-blue-950"
              >
                Full Name
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <UserRound size={19} className="shrink-0 text-slate-400" />

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-blue-950"
              >
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <Mail size={19} className="shrink-0 text-slate-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-blue-950"
              >
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <LockKeyhole size={19} className="shrink-0 text-slate-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>
          

            {/* Error Message */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Create Account
              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              Login Now
            </Link>
          </p>
        </div>
      </section>

      {/* RIGHT SIDE: BLUE FINTECH BACKGROUND */}
      <section className="relative hidden min-h-screen overflow-hidden bg-blue-700 lg:block">
        <img
          src={register}
          alt="Dhanadhya Finance digital banking"
          className="absolute inset-0 h-full w-full object-cover object-right"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/30 via-transparent to-blue-500/10" />

        <div className="absolute bottom-10 left-8 right-8 rounded-2xl border border-white/30 bg-white/15 p-5 text-white shadow-xl backdrop-blur-md xl:left-12 xl:right-12">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-3">
              <ShieldCheck size={27} />
            </div>

            <div>
              <h3 className="font-bold">Your money. Your future.</h3>
              <p className="mt-1 text-sm text-white/85">
                A simpler way to manage your financial journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Register

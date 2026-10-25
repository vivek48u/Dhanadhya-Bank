
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import registerBg from '../assets/reg.png'
import api from '../api/axios'
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Landmark,
} from 'lucide-react'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Connect your existing backend login API here.

       try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });
      console.log(response.data)

      // Successful login ke baad dashboard par jao.
      navigate("/app");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    } 
  }

  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* LEFT: LOGIN FORM */}
      <section className="flex min-h-screen items-center justify-center px-5 py-4 sm:px-10 lg:px-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="mb-4 flex items-center gap-3">
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
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <ShieldCheck size={16} />
              Secure Online Banking
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl">
              Welcome <span className="text-blue-600">Back!</span>
            </h1>

            <p className="mt-3 leading-7 text-slate-500">
              Login to your Dhanadhya Finance account and continue your
              financial journey.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

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
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent py-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="text-slate-400 transition hover:text-blue-600"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-blue-600"
                />
                Remember me
              </label>

              
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-4 font-semibold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Login to Your Account
              <ArrowRight
                size={20}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </form>

          <p className="mt-3 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-bold text-blue-600 hover:text-blue-800"
            >
              Register Now
            </Link>
          </p>
        </div>
      </section>

      {/* RIGHT: FINTECH BACKGROUND */}
      <section className="relative hidden min-h-screen overflow-hidden bg-blue-700 lg:block">
        <div
          className="absolute inset-0 bg-cover bg-right"
          style={{
            backgroundImage: "url('/src/assets/logi.png')",
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right center',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-transparent to-blue-500/10" />

        <div className="absolute bottom-10 left-8 right-8 rounded-2xl border border-white/30 bg-white/15 p-5 text-white shadow-xl backdrop-blur-md xl:left-12 xl:right-12">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-3">
              <ShieldCheck size={27} />
            </div>
            <div>
              <h3 className="font-bold">Banking made simple.</h3>
              <p className="mt-1 text-sm text-white/85">
                Your financial journey, all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login

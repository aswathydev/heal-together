import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAuth()
  const from = location.state?.from

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    // if (user.role === 'admin') {
    //   navigate(from && String(from).startsWith('/admin') ? from : '/admin', {
    //     replace: true,
    //   })
    //   return
    // }
    if (user.role === 'provider') {
      navigate(from && String(from).startsWith('/provider') ? from : '/provider/dashboard', {
        replace: true,
      })
      return
    }
    navigate(from && !String(from).startsWith('/admin') ? from : '/', { replace: true })
  }, [user, from, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const result = login(email, password, ['member', 'provider'])
    if (!result.ok) {
      setError(result.error)
      return
    }
    // if (result.role === 'admin') {
    //   navigate(from && String(from).startsWith('/admin') ? from : '/admin', { replace: true })
    // }
    if (result.role === 'provider') {
      navigate(from && String(from).startsWith('/provider') ? from : '/provider/dashboard', {
        replace: true,
      })
    } else {
      navigate(from && !String(from).startsWith('/admin') ? from : '/', { replace: true })
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-slate-300 p-10">
  
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-600">
            Join Heal Together 🌿
          </h1>
          <p className="mt-2 text-slate-500">
            Start your wellness journey today
          </p>
        </div>
  
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <p
              className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-2 text-sm text-rose-600"
              role="alert"
            >
              {error}
            </p>
          )}
  
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-4 text-sm font-medium hover:opacity-90 transition"
          >
            Log in
          </button>
        </form>
  
        <p className="mt-6 text-center text-slate-500">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-teal-600"
          >
            Create one
          </Link>
        </p>
  
        <p className="mt-2 text-center text-slate-500">
          Provider?{' '}
          <Link
            to="/provider/register"
            className="font-medium text-indigo-600"
          >
            Register as provider
          </Link>
        </p>
  
      </div>
    </div>
  )
  
  // return (

  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4">
  //     <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

  //       <div className="text-center">
  //         <h1 className="text-2xl font-semibold text-slate-900">
  //           Welcome Back 💙
  //         </h1>
  //         <p className="mt-2 text-sm text-slate-500">
  //           Login to continue
  //         </p>
  //       </div>

  //       <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
  //         {error && (
  //           <p
  //             className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-700"
  //             role="alert"
  //           >
  //             {error}
  //           </p>
  //         )}

  //         <label className="block text-left">
  //           <span className="text-sm font-medium text-slate-700">
  //             Email
  //           </span>
  //           <input
  //             type="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             placeholder="you@example.com"
  //             autoComplete="email"
  //             required
  //             className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
  //           />
  //         </label>

  //         <label className="block text-left">
  //           <span className="text-sm font-medium text-slate-700">
  //             Password
  //           </span>
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             placeholder="••••••••"
  //             autoComplete="current-password"
  //             required
  //             className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
  //           />
  //         </label>

  //         <button
  //           type="submit"
  //           className="w-full rounded-lg bg-teal-500 text-white py-2.5 text-sm font-medium hover:bg-teal-600 transition"
  //         >
  //           Log in
  //         </button>
  //       </form>

  //       <p className="mt-6 text-center text-sm text-slate-500">
  //         No account?{' '}
  //         <Link
  //           to="/register"
  //           className="font-medium text-teal-600 hover:underline"
  //         >
  //           Create one
  //         </Link>
  //       </p>

  //       <p className="mt-2 text-center text-sm text-slate-500">
  //         Provider?{' '}
  //         <Link
  //           to="/provider/register"
  //           className="font-medium text-indigo-600 hover:underline"
  //         >
  //           Register as provider
  //         </Link>
  //       </p>

  //     </div>
  //   </div>
  // )
}

import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo4 from '../assets/logo4.png' // adjust path
import { FaUserCircle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/#features', label: 'Features' },
  { to: '/games', label: 'Games' },
  { to: '/providers', label: 'Support' },
]

const navClass = ({ isActive }) =>
  [
    'px-3 py-2 text-sm font-medium transition-all duration-200',
    isActive
      ? 'text-teal-700'
      : 'text-slate-600 hover:text-teal-600',
  ].join(' ')

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { user, logout, isAdmin, isProvider } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/', { replace: true })
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/100 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-800">
          <img src={logo4} alt="Heal Together" className="h-19 w-19 object-contain" />
          {/* <span className="hidden sm:inline text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Heal Together
          </span> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Mood History Icon */}
          {(user  && user.role === 'member') ? <Link
            to="/mood-history"
            className="p-2 rounded-full hover:bg-slate-100 transition"
            title="Mood History"
          >
            <svg
              className="h-5 w-5 text-slate-600 hover:text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 19h16M4 15l4-4 4 4 6-6"
              />
            </svg>
          </Link> : null}

          {user ? (
            <div className="flex items-center gap-2">
              {!isAdmin && <Link
                to="/profile"
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400 transition"
                title={user.email}
                aria-label={`Open profile for ${user.email}`}
              >
                <FaUserCircle className="h-7 w-7" />
              </Link>}
              {/* {isAdmin && (
                <Link
                  to="/admin"
                  className="px-3 py-2 text-sm font-medium rounded-full border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Admin
                </Link>
              )} */}
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold rounded-full border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Log out
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold rounded-full border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/register"
            className="px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm hover:opacity-90 transition"
          >
            Sign Up
          </Link>
        </div> */}

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2"
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white/90 backdrop-blur-xl border-t border-slate-200 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={navClass}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}

          <Link
            to="/mood-history"
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600"
            onClick={() => setOpen(false)}
          >
            <svg
              className="h-5 w-5 text-slate-600 hover:text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 19h16M4 15l4-4 4 4 6-6"
              />
            </svg>
            Mood History
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                <FaUserCircle className="h-6 w-6 text-slate-500" aria-hidden />
                Profile
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-center rounded-full border border-slate-200 py-2 font-medium text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  Admin dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="text-center rounded-full border border-slate-200 py-2 font-medium text-slate-700"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-center rounded-full border border-slate-200 py-2 font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 font-medium"
                onClick={() => setOpen(false)}
              >
                Sign up free
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}

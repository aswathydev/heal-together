import { useState } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'

import logo3 from '../assets/logo3.png' // adjust path
import { FaUserCircle } from 'react-icons/fa'

// 1. Import Redux hooks and your slice logout action
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

const links = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/providers', label: 'Support' },
  { to: '/journals', label: 'Journaling' }
]


const navClass = ({ isActive }) =>
  `
    relative px-5 py-2 rounded-full text-sm font-medium
    transition-all duration-300
    ${isActive
    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
    : "text-slate-700 hover:bg-slate-100 hover:text-cyan-600"
  }
  `;



export default function Nav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  // 2. Setup Redux dispatch and select auth state
  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)
  // alert(`${JSON.stringify(user)}`)

  // Derive admin/provider flags directly from user role object in Redux
  const isAdmin = user?.role === 'admin'
  const isProvider = user?.role === 'provider'
  const location = useLocation();

  function handleLogout() {
    // 3. Dispatch the logout action to clear Redux + localStorage
    dispatch(logout())
    navigate('/login', { replace: true })
    setOpen(false)
  }

  return (

    <header className="
  sticky top-0 z-50
  bg-gradient-to-r
  from-cyan-50
  via-sky-50
  to-blue-50
  backdrop-blur-xl
  border-b border-slate-200/50
  shadow-sm
">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3">
          {/* <img
    src={logo3}
    alt="Heal Together"
    className="h-16 w-16 object-contain"
  /> */}

          <div>
            {/* className="hidden md:block leading-none" */}
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-sky-500">Heal</span>
              <span className="text-green-500">Together</span>
            </h1>

            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 mt-1">
              Mental Wellness
            </p>
          </div>
        </Link>

        {/* <Link to="/" className="flex items-center gap-3">
          <img
            src={logo3}
            alt="Heal Together"
            className="h-20 w-20 object-contain"
          />

          <span className="
  hidden md:block
  text-3xl
  font-extrabold
  tracking-tight
  bg-gradient-to-r
  from-cyan-500
  via-blue-500
  to-indigo-600
  bg-clip-text
  text-transparent
  drop-shadow-sm
">
            HealTogether
          </span>
        </Link> */}

        {user?.role === 'user' && (

          <nav className="hidden lg:flex items-center gap-6">


            {links.map((l) => {
              if (l.to.includes("#")) {
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`px-5 py-2 rounded-full ${location.hash === l.to.split("#")[1]
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                      : "text-slate-700"
                      }`}
                  >
                    {l.label}
                  </Link>
                );
              }

              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end
                  className={navClass}
                >
                  {l.label}
                </NavLink>
              );
            })}
          </nav>
        )}

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Mood History Icon */}
          {(token && (user?.role === 'user'))? <Link
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

          {token ? (
            <div className="flex items-center gap-3">

              {/* Profile */}
              <Link
                to={(user?.role === 'user') ? "/profile" : "/provider/dashboard"}
                title={user?.email}
                aria-label={`Open profile for ${user?.email}`}
                className="
        flex items-center justify-center
        h-11 w-11
        rounded-full
        bg-gradient-to-br
        from-green-50
        to-blue-50
        border border-slate-200
        shadow-sm
        transition-all duration-300
        hover:scale-105
        hover:shadow-md
      "
              >
                <FaUserCircle className="h-7 w-7 text-cyan-600" />
              </Link>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="
        px-5 py-2.5
        rounded-full
        font-semibold
        text-sm
        text-slate-700
        bg-white
        border border-slate-200
        shadow-sm
        transition-all duration-300
        hover:bg-red-50
        hover:border-red-200
        hover:text-red-600
        hover:shadow-md
      "
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">

              {/* Login */}
              <Link
                to="/login"
                className="
        px-5 py-2.5
        rounded-full
        text-sm
        font-semibold
        text-slate-700
        bg-white
        border border-slate-200
        shadow-sm
        transition-all duration-300
        hover:bg-slate-50
        hover:shadow-md
      "
              >
                Login
              </Link>

              {/* Sign Up */}
              <Link
                to="/register"
                className="
        px-6 py-2.5
        rounded-full
        text-sm
        font-semibold
        text-white
        bg-gradient-to-r
        from-green-500
        via-cyan-500
        to-blue-600
        shadow-lg
        transition-all duration-300
        hover:scale-105
        hover:shadow-xl
      "
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        {/* <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="rounded-lg border border-slate-400 p-2"
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
        </div> */}

        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="
      group
      flex h-11 w-11 items-center justify-center
      rounded-xl
      bg-white/80 backdrop-blur-md
      border border-slate-200
      shadow-sm
      transition-all duration-300
      hover:shadow-lg
      hover:scale-105
      active:scale-95
    "
            aria-label="Toggle menu"
          >
            <svg
              className={`h-6 w-6 text-slate-700 transition-transform duration-300 ${open ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
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

          {token ? (
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
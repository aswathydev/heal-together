import { useState } from 'react'
import { NavLink, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FaChartPie,
  FaShieldAlt,
  FaBullhorn,
  FaUsers,
  FaHome,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { FaMessage, FaReceipt, FaServicestack } from 'react-icons/fa6'

const nav = [
  { to: '/admin', label: 'Overview', icon: FaChartPie, end: true },
  { to: '/admin/users', label: 'Users', icon: FaUsers },
  { to: '/admin/posts', label: 'Posts', icon: FaMessage },
  { to: '/admin/reports', label: 'Reports', icon: FaReceipt },
  { to: '/admin/providers', label: 'Providers', icon: FaServicestack },
  { to: '/admin/moderation', label: 'Moderation', icon: FaShieldAlt },
  { to: '/admin/help-banners', label: 'Help banners', icon: FaBullhorn },
]

const linkClass = ({ isActive }) =>
  [
    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
    isActive
      ? 'bg-teal-600 text-white shadow-sm'
      : 'text-slate-300 hover:bg-slate-800 hover:text-white',
  ].join(' ')

const titles = {
  '/admin': 'Overview',
  '/admin/moderation': 'Moderation',
  '/admin/help-banners': 'Help banners',
  '/admin/users': 'Users',
  '/admin/posts': 'Posts',
  '/admin/reports': 'Reports',
  '/admin/providers': 'Providers',

}

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const pageTitle = titles[pathname] ?? 'Admin'

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="min-h-svh flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-slate-800 bg-slate-900 text-slate-100 lg:static lg:translate-x-0 transition-transform duration-200',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-slate-800 px-4">
          <span className="text-sm font-semibold tracking-tight text-white">
            Admin · Heal Together
          </span>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const NavIcon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={linkClass}
                onClick={() => setMobileOpen(false)}
              >
                <NavIcon className="h-4 w-4 shrink-0 opacity-90" />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-slate-800 p-3 space-y-2">
          {user?.email && (
            <p className="px-3 text-xs text-slate-500 truncate" title={user.email}>
              {user.email}
            </p>
          )}
          {/* <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <FaHome className="h-4 w-4" />
            Back to site
          </Link> */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-left"
          >
            <FaSignOutAlt className="h-4 w-4" />
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-4 sm:px-6">
          <button
            type="button"
            className="rounded-lg border border-slate-200 dark:border-slate-700 p-2 text-slate-600 dark:text-slate-300 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FaBars className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white truncate">
            {pageTitle}
          </h1>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

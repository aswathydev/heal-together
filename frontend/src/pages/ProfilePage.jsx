import { Navigate, Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: '/profile' }} />
  }

  return (
    <div className="max-w-lg mx-auto space-y-6 text-center sm:text-left">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <FaUserCircle className="h-20 w-20 text-slate-300 dark:text-slate-600 mx-auto sm:mx-0" />
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-purple">Profile</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 break-all">{user.email}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-teal-600 dark:text-teal-400">
            {user.role === 'admin'
              ? 'Administrator'
              : user.role === 'provider'
                ? 'Provider'
                : 'Member'}
          </p>
        </div>
      </div>
      {user.role === 'provider' && (
        <Link
          to="/provider/dashboard"
          className="inline-block text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
        >
          Open provider dashboard
        </Link>
      )}
      <Link
        to="/"
        className="inline-block text-sm font-medium text-teal-600 dark:text-teal-400 hover:underline"
      >
        ← Back to home
      </Link>
    </div>
  )
}

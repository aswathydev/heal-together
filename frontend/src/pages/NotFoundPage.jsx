import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center py-16 space-y-4">
      <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">404</h1>
      <p className="text-slate-500">This page does not exist.</p>
      <Link to="/" className="inline-block text-teal-700 dark:text-teal-300 font-medium hover:underline">
        Go home
      </Link>
    </div>
  )
}

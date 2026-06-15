import { Link } from 'react-router-dom'
import {
  helpRequests,
  moderationQueue,
  providers,
  feedPosts,
} from '../../data/mockData'
import { FaArrowRight } from 'react-icons/fa'

function StatCard({ title, value, hint, to, accent }) {
  const inner = (
    <div
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-sm transition hover:border-teal-300 dark:hover:border-teal-700 ${
        to ? 'cursor-pointer' : ''
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <p className={`mt-2 text-3xl font-semibold tabular-nums ${accent}`}>{value}</p>
      {hint && <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{hint}</p>}
      {to && (
        <p className="mt-3 flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400">
          Open <FaArrowRight className="h-3 w-3" />
        </p>
      )}
    </div>
  )

  if (to) {
    return (
      <Link to={to} className="block rounded-2xl">
        {inner}
      </Link>
    )
  }
  return inner
}

export default function DashboardHome() {
  // Mock analytics (replace with API later)
  const totalUsers = 1200
  const activeUsers = 860
  const totalPosts = 5400
  const reportsCount = 32
  const providersCount = providers.length

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Dashboard Analytics
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Overview of platform usage and moderation insights.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Users"
          value={totalUsers}
          accent="text-indigo-600"
        />

        <StatCard
          title="Active Users"
          value={activeUsers}
          hint="Users active in last 24h"
          accent="text-green-600"
        />

        <StatCard
          title="Total Posts"
          value={totalPosts}
          to="/admin/posts"
          accent="text-blue-600"
        />

        <StatCard
          title="Reports"
          value={reportsCount}
          to="/admin/reports"
          accent="text-red-600"
        />

        <StatCard
          title="Providers"
          value={providersCount}
          to="/admin/providers"
          accent="text-teal-600"
        />
      </div>

      {/* Keep your existing sections below if needed */}

       {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border p-5 bg-white">
          <h3 className="text-sm font-semibold mb-4 text-slate-500">User Activity</h3>
          <UserChart />
        </div>

        <div className="rounded-2xl border p-5 bg-white">
          <h3 className="text-sm font-semibold mb-4 text-slate-500">Posts vs Reports</h3>
          <PostsChart />
        </div>
      </div>

    </div>
  )
}





import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const userData = [
  { day: 'Mon', users: 200 },
  { day: 'Tue', users: 400 },
  { day: 'Wed', users: 350 },
  { day: 'Thu', users: 500 },
  { day: 'Fri', users: 650 },
]

function UserChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={userData}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="users" />
      </LineChart>
    </ResponsiveContainer>
  )
}

const postData = [
  { name: 'Posts', value: 5400 },
  { name: 'Reports', value: 32 },
]

function PostsChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={postData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>
    </ResponsiveContainer>
  )
}

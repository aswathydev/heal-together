
import { useState, useMemo } from 'react'
import { FaUserCircle, FaEnvelope, FaSearch } from 'react-icons/fa'

const sampleUsers = Array.from({ length: 35 }).map((_, i) => ({
  id: `u${i}`,
  name: `User ${i}`,
  email: `user${i}@mail.com`,
  role: i % 3 === 0 ? 'Provider' : 'Member',
  joined: '2026',
  status: i % 5 === 0 ? 'suspended' : 'active',
  posts: Math.floor(Math.random() * 20),
  reports: Math.floor(Math.random() * 4),
}))

export default function UsersPage() {
  const [users, setUsers] = useState(sampleUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [reportedOnly, setReportedOnly] = useState(false)

  const [page, setPage] = useState(1)
  const perPage = 8

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())

      const matchesRole = roleFilter === 'all' || u.role === roleFilter
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter
      const matchesReports = !reportedOnly || u.reports > 0

      return matchesSearch && matchesRole && matchesStatus && matchesReports
    })
  }, [users, search, roleFilter, statusFilter, reportedOnly])

  const totalPages = Math.ceil(filteredUsers.length / perPage)
  const paginatedUsers = filteredUsers.slice((page - 1) * perPage, page * perPage)

  const toggleBan = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' }
          : u
      )
    )
  }

  function exportCSV() {
    const rows = filteredUsers.map(u =>
      `${u.name},${u.email},${u.role},${u.status},${u.posts},${u.reports}`
    )

    const csv = `Name,Email,Role,Status,Posts,Reports\n${rows.join('\n')}`

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.csv'
    a.click()
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      <h2 className="text-2xl font-semibold">Users Management</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 border px-3 py-2 rounded-xl bg-white">
          <FaSearch />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="outline-none text-sm text-slate-500"
          />
        </div>

        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="border px-3 py-2 rounded-xl">
          <option value="all">All Roles</option>
          <option value="Member">Member</option>
          <option value="Provider">Provider</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border px-3 py-2 rounded-xl">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>

        <button
          onClick={() => setReportedOnly(!reportedOnly)}
          className={`px-3 py-2 rounded-xl text-sm ${reportedOnly ? 'bg-red-100 text-red-600' : 'border'}`}
        >
          ⚠️ Reported Only
        </button>

        <button onClick={exportCSV} className="px-3 py-2 bg-teal-600 text-white rounded-xl text-sm">
          Export CSV
        </button>
      </div>

      <p className="text-sm text-slate-500">Showing {filteredUsers.length} users</p>

      {/* Table */}
      <div className="bg-white border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-3 text-left text-slate-500">User</th>
              <th className="text-slate-500">Role</th>
              <th className="text-slate-500">Posts</th>
              <th className="text-slate-500">Reports</th>
              <th className="text-slate-500">Status</th>
              <th className="text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(u => (
              <tr key={u.id} className="border-t">
                <td className="p-3 flex items-center gap-2">
                  <FaUserCircle />
                  <div>
                    <p  className="text-slate-500">{u.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <FaEnvelope /> {u.email}
                    </p>
                  </div>
                </td>
                <td className="text-center text-slate-500">{u.role}</td>
                <td className="text-center text-slate-500">{u.posts}</td>
                <td className="text-center text-slate-500">{u.reports}</td>
                <td className="text-center text-slate-500">
                  <span className={`px-2 py-1 rounded text-xs ${u.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="text-center">
                  <button onClick={() => toggleBan(u.id)} className="text-xs text-red-600">
                    {u.status === 'active' ? 'Ban' : 'Unban'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat title="Total Users" value={users.length} />
        <Stat title="Active" value={users.filter(u => u.status === 'active').length} />
        <Stat title="Suspended" value={users.filter(u => u.status === 'suspended').length} />
        <Stat title="Reported" value={users.filter(u => u.reports > 0).length} />
      </div>

    </div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="p-4 bg-white border rounded-xl text-center">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-xl font-semibold text-slate-500">{value}</p>
    </div>
  )
}

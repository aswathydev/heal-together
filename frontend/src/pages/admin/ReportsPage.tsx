import React from 'react'
import { useState } from 'react'

const sampleReports = [
  {
    id: 1,
    type: 'Post',
    reason: 'Abusive content',
    reportedUser: 'Rahul M.',
    status: 'Pending',
  },
  {
    id: 2,
    type: 'Comment',
    reason: 'Spam',
    reportedUser: 'Anjali K.',
    status: 'Resolved',
  },
  {
    id: 3,
    type: 'User',
    reason: 'Harassment',
    reportedUser: 'Anonymous',
    status: 'Rejected',
  },
]

export default function ReportsPage() {
  const [reports, setReports] = useState(sampleReports)
  const [filter, setFilter] = useState('All')

  const filteredReports =
    filter === 'All' ? reports : reports.filter((r) => r.type === filter)

  const updateStatus = (id, status) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    )
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Reports Management</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option>All</option>
          <option>Post</option>
          <option>User</option>
          <option>Comment</option>
        </select>
      </div>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-slate-500">Type</th>
              <th className="px-4 py-2 text-left text-slate-500">Reason</th>
              <th className="px-4 py-2 text-slate-500">Reported User</th>
              <th className="px-4 py-2 text-slate-500">Status</th>
              <th className="px-4 py-2 text-slate-500">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredReports.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3">{r.reason}</td>
                <td className="px-4 py-3 text-center">{r.reportedUser}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      r.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : r.status === 'Resolved'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center space-x-2">
                  <button className="text-red-500 text-xs">Delete Content</button>
                  <button className="text-orange-500 text-xs">Warn</button>
                  <button className="text-red-700 text-xs">Ban</button>

                  <button
                    onClick={() => updateStatus(r.id, 'Resolved')}
                    className="text-green-600 text-xs"
                  >
                    Resolve
                  </button>

                  <button
                    onClick={() => updateStatus(r.id, 'Rejected')}
                    className="text-gray-600 text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

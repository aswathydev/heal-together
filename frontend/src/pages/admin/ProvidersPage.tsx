import React from 'react'
import { useState } from 'react'

const sampleProviders = [
  {
    id: 1,
    name: 'Dr. Samira Patel',
    status: 'Pending',
    services: ['Therapy', 'Counseling'],
    rating: 4.5,
    reviews: 12,
  },
  {
    id: 2,
    name: 'Dr. John Mathew',
    status: 'Approved',
    services: ['Psychiatry'],
    rating: 4.8,
    reviews: 25,
  },
  {
    id: 3,
    name: 'Dr. Neha Sharma',
    status: 'Disabled',
    services: ['Therapy'],
    rating: 4.2,
    reviews: 8,
  },
]

export default function ProvidersPage() {
  const [providers, setProviders] = useState(sampleProviders)
  const [selectedProvider, setSelectedProvider] = useState(null)

  const updateStatus = (id, status) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p))
    )
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Provider Management</h2>

      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-slate-500">Name</th>
              <th className="px-4 py-2 text-slate-500">Services</th>
              <th className="px-4 py-2 text-slate-500">Rating</th>
              <th className="px-4 py-2 text-slate-500">Reviews</th>
              <th className="px-4 py-2 text-slate-500">Status</th>
              <th className="px-4 py-2 text-slate-500">Actions</th>
            </tr>
          </thead>

          <tbody>
            {providers.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">{p.name}</td>

                <td className="px-4 py-3 text-center">
                  {p.services.join(', ')}
                </td>

                <td className="px-4 py-3 text-center">⭐ {p.rating}</td>

                <td className="px-4 py-3 text-center">{p.reviews}</td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      p.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : p.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => setSelectedProvider(p)}
                    className="text-blue-600 text-xs"
                  >
                    View
                  </button>

                  {p.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(p.id, 'Approved')}
                        className="text-green-600 text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(p.id, 'Rejected')}
                        className="text-red-600 text-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {p.status === 'Approved' && (
                    <button
                      onClick={() => updateStatus(p.id, 'Disabled')}
                      className="text-red-600 text-xs"
                    >
                      Disable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px] space-y-3">
            <h3 className="text-lg font-semibold text-slate-500">Provider Profile</h3>

            <p className="text-slate-500"><strong>Name:</strong> {selectedProvider.name}</p>
            <p className="text-slate-500"><strong>Services:</strong> {selectedProvider.services.join(', ')}</p>
            <p className="text-slate-500"><strong>Rating:</strong> ⭐ {selectedProvider.rating}</p>
            <p className="text-slate-500"><strong>Reviews:</strong> {selectedProvider.reviews}</p>
            <p className="text-slate-500"><strong>Status:</strong> {selectedProvider.status}</p>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedProvider(null)}
                className="px-3 py-1 border rounded text-sm text-slate-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

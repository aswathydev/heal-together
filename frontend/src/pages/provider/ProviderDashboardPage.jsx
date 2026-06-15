
import { useState } from 'react'

const tabs = [
  'Dashboard',
  'Appointments',
  'Availability',
  'Services',
  'Reviews',
  'Earnings',
  'Profile'
]

// Dummy Data
const dummyAppointments = [
  { id: 1, name: 'Anjali', date: '2026-04-10', time: '10:00', status: 'upcoming' },
  { id: 2, name: 'Rahul', date: '2026-04-08', time: '14:00', status: 'completed' },
]

const dummyServices = [
  { id: 1, title: 'Therapy Session', price: 500 },
]

const dummyReviews = [
  { id: 1, user: 'Meera', rating: 5, comment: 'Very helpful session!' },
]

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  return (
    <div className="min-h-screen bg-slate-100 py-6">
      <div className="max-w-6xl mx-auto px-4">

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap bg-white p-2 rounded-2xl shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${activeTab === tab
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'Dashboard' && <Dashboard />}
        {activeTab === 'Appointments' && <Appointments />}
        {activeTab === 'Availability' && <Availability />}
        {activeTab === 'Services' && <Services />}
        {activeTab === 'Reviews' && <Reviews />}
        {activeTab === 'Earnings' && <Earnings />}
        {activeTab === 'Profile' && <Profile />}
      </div>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Total Sessions" value="24" />
      <Card title="Upcoming" value="5" />
      <Card title="Earnings" value="₹12,000" />
    </div>
  )
}

function Appointments() {
  return (
    <div className="space-y-3">
      {dummyAppointments.map(a => (
        <div key={a.id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition flex justify-between">
          <div>
            <p className="font-medium text-slate-500">{a.name}</p>
            <p className="text-sm text-slate-500">{a.date} at {a.time}</p>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${a.status === 'upcoming'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-green-100 text-green-700'
              }`}
          >
            {a.status}
          </span>
        </div>
      ))}
    </div>
  )
}

function Availability() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="bg-white p-5 rounded-2xl border">
        <h2 className="font-semibold mb-4 text-slate-500">Set Availability</h2>

        <input
          type="time"
          className="border rounded-lg px-3 py-2 mr-2"
        />
        <input
          type="time"
          className="border rounded-lg px-3 py-2"
        />

        <button className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-lg">
          Save
        </button>
      </div>
    </div>
  )
}

function Services() {
  return (
    <div className="space-y-3">

      <div className="bg-white p-5 rounded-2xl border">
        <h2 className="font-semibold mb-4 text-slate-500">Your Services</h2>

        <button className="mb-4 px-4 py-2 bg-teal-600 text-white rounded-lg">
          + Add Service
        </button>

        {dummyServices.map(s => (
          <div key={s.id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm hover:shadow-md transition flex justify-between">
            <p className="text-slate-500">{s.title}</p>
            <p className="font-medium text-slate-500">₹{s.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Reviews() {
  return (
    <div className="space-y-3">
      {dummyReviews.map(r => (
        <div key={r.id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <p className="font-medium text-slate-500">{r.user}</p>
          <p className="text-slate-500">⭐ {r.rating}</p>
          <p className="text-sm text-slate-500">{r.comment}</p>
        </div>
      ))}
    </div>
  )
}

function Earnings() {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
      <p className="text-lg font-semibold text-slate-800">Total Earnings</p>
      <p className="text-2xl font-bold text-teal-600 mt-2">₹12,000</p>
      <p className="text-sm text-slate-500 mt-1">(Dummy data)</p>
    </div>
  )
}

function Profile() {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
      <div className="space-y-6">

        <div className="bg-white p-5 rounded-2xl border">
          <h2 className="font-semibold mb-4 text-teal-600 ">Profile</h2>

          <input
            placeholder="Your Name"
            className="w-full border border-slate-200 p-2 rounded-lg mb-3 text-slate-600 " 
          />

          <textarea
            placeholder="Bio"
            className="w-full border border-slate-200 p-2 rounded-lg mb-3 text-slate-600"
          />

          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg">
            Save Changes
          </button>
        </div>
      </div>    </div>
  )
}

function Card({ title, value }) {
  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
    </div>
  )
}

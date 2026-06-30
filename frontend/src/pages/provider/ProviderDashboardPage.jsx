
import { useState } from 'react'
import axiosInstance from "../../api/axiosInstance";

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

  const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  
    const [availability, setAvailability] = useState({
      day: "Monday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
    });
  
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const handleChange = (field, value) => {
      setAvailability((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
  
        const res = await axiosInstance.post(
          "/availability",
          availability
        );
  
        setSlots([
          ...slots,
          res.data.data,
        ]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await axiosInstance.delete(
          `/availability/${id}`
        );
  
        setSlots(
          slots.filter(
            (slot) => slot._id !== id
          )
        );
      } catch (err) {
        console.log(err);
      }
    };

  return (
    // <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    //   <div className="bg-white p-5 rounded-2xl border">
    //     <h2 className="font-semibold mb-4 text-slate-500">Set Availability</h2>

    //     <input
    //       type="time"
    //       className="border rounded-lg px-3 py-2 mr-2"
    //     />
    //     <input
    //       type="time"
    //       className="border rounded-lg px-3 py-2"
    //     />

    //     <button className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-lg">
    //       Save
    //     </button>
    //   </div>
    // </div>

    <div className="max-w-6xl mx-auto p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Availability Schedule
        </h1>

        <p className="mt-2 text-slate-500">
          Configure your weekly recurring availability.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* FORM */}
        <div className="lg:col-span-1">
          <div className="
            rounded-3xl
            p-6
            shadow-lg
            border border-slate-200
            bg-gradient-to-br
            from-white
            via-indigo-50
            to-cyan-50
          ">
            <h2 className="text-xl font-semibold mb-6 text-slate-900">
              Add Availability
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Day */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  Day
                </label>

                <select
                  value={availability.day}
                  onChange={(e) =>
                    handleChange(
                      "day",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    p-3
                    focus:ring-2
                    focus:ring-indigo-500
                    outline-none text-slate-900
                  "
                >
                  {DAYS.map((day) => (
                    <option key={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  Start Time
                </label>

                <input
                  type="time"
                  value={availability.startTime}
                  onChange={(e) =>
                    handleChange(
                      "startTime",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    p-3
                    focus:ring-2
                    focus:ring-indigo-500
                    outline-none text-slate-900
                  "
                />
              </div>

              {/* End */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-900">
                  End Time
                </label>

                <input
                  type="time"
                  value={availability.endTime}
                  onChange={(e) =>
                    handleChange(
                      "endTime",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    p-3
                    focus:ring-2
                    focus:ring-indigo-500
                    outline-none text-slate-900
                  "
                />
              </div>

              {/* Toggle */}
              <label className="flex items-center gap-3 text-slate-900">
                <input
                  type="checkbox"
                  checked={
                    availability.isAvailable
                  }
                  onChange={(e) =>
                    handleChange(
                      "isAvailable",
                      e.target.checked
                    )
                  }
                />

                <span>
                  Available for booking
                </span>
              </label>

              <button
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-cyan-600
                  text-white
                  py-3
                  font-semibold
                  hover:opacity-90
                  transition
                "
              >
                {loading
                  ? "Saving..."
                  : "Save Availability"}
              </button>
            </form>
          </div>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2">
          <div className="
            rounded-3xl
            p-6
            shadow-lg
            border border-slate-200
            bg-white
          ">
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Weekly Schedule
              </h2>

              <span className="
                bg-indigo-100
                text-indigo-700
                px-3
                py-1
                rounded-full
                text-sm
              ">
                {slots.length} Slots
              </span>
            </div>

            {slots.length === 0 ? (
              <div className="
                text-center
                py-16
                text-slate-400
              ">
                No availability added yet
              </div>
            ) : (
              <div className="space-y-4">
                {slots.map((slot) => (
                  <div
                    key={slot._id}
                    className="
                      flex
                      justify-between
                      items-center
                      p-5
                      rounded-2xl
                      border
                      border-slate-200
                      hover:shadow-md
                      transition
                    "
                  >
                    <div>
                      <h3 className="font-semibold text-lg">
                        {slot.day}
                      </h3>

                      <p className="text-slate-500">
                        {slot.startTime} —{" "}
                        {slot.endTime}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm
                          ${
                            slot.isAvailable
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }
                        `}
                      >
                        {slot.isAvailable
                          ? "Available"
                          : "Unavailable"}
                      </span>

                      <button
                        onClick={() =>
                          handleDelete(
                            slot._id
                          )
                        }
                        className="
                          px-4
                          py-2
                          rounded-lg
                          bg-red-50
                          text-red-600
                          hover:bg-red-100
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
// }
  // )
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

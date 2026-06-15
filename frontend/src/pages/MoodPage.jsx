import { useState } from 'react'
import MoodPrompt from '../components/home/MoodPrompt'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const moodMap = {
  great: 4,
  okay: 3,
  low: 2,
  rough: 1,
}

const options = ['great', 'okay', 'low', 'rough']

const initialHistory = [
  { day: 'Mon', mood: 'okay' },
  { day: 'Tue', mood: 'low' },
  { day: 'Wed', mood: 'okay' },
  { day: 'Thu', mood: 'great' },
  { day: 'Fri', mood: 'rough' },
  { day: 'Sat', mood: 'okay' },
  { day: 'Sun', mood: 'great' },
]


const chartData = initialHistory.map((item) => ({
  day: item.day,
  mood: moodMap[item.mood],
}))


export default function MoodPage() {
  const [history, setHistory] = useState(initialHistory)
  const [today, setToday] = useState('okay')

  function logToday() {
    setHistory((h) => {
      const rest = h.slice(0, -1)
      return [...rest, { day: 'Today', mood: today }]
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-purple">Mood tracking</h1>
        <p className="text-sm text-slate-500 mt-1">Log today and browse a simple history.</p>
      </div>

      <section className="w-full md:flex-[7] rounded-2xl bg-gradient-to-br from-amber-700 to-purple-700 dark:from-blue-900/80 dark:to-purple-900/70 border border-amber-800 dark:border-amber-700/50 p-6 text-left">
        <div className="flex flex-wrap gap-2">
          <MoodPrompt />
        </div>
      </section>


      <section className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
        <h2 className="font-semibold text-slate-900 dark:text-purple mb-4">
          Mood trend
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis
                domain={[1, 4]}
                ticks={[1, 2, 3, 4]}
                tickFormatter={(val) => {
                  return Object.keys(moodMap).find(key => moodMap[key] === val)
                }}
              />
              <Tooltip
                formatter={(value) =>
                  Object.keys(moodMap).find(key => moodMap[key] === value)
                }
              />
              <Line
                type="monotone"
                dataKey="mood"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>


      <section className="text-left">
        <h2 className="font-semibold text-slate-900 dark:text-purple mb-3">Recent week</h2>
        <ul className="space-y-2">
          {history.map((row, i) => (
            <li
              key={`${row.day}-${i}`}
              className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-2 text-sm"
            >
              <span className="text-slate-500">{row.day}</span>
              <span className="font-medium capitalize text-purple-800 dark:text-purple-500">{row.mood}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

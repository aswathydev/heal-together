import { useEffect, useState } from "react";
import MoodPrompt from '../components/home/MoodPrompt'
import { LineChart, Bar, BarChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  addMood,
  getHistory,
  getWeekly,
  getMonthly,
  getStreak,
  getAlert,
  getAI,
} from "../services/moodHistoryServices";
// const moodMap = {
//   great: 4,
//   okay: 3,
//   low: 2,
//   rough: 1,
// }

// const options = ['great', 'okay', 'low', 'rough']

// const initialHistory = [
//   { day: 'Mon', mood: 'okay' },
//   { day: 'Tue', mood: 'low' },
//   { day: 'Wed', mood: 'okay' },
//   { day: 'Thu', mood: 'great' },
//   { day: 'Fri', mood: 'rough' },
//   { day: 'Sat', mood: 'okay' },
//   { day: 'Sun', mood: 'great' },
// ]


// const chartData = initialHistory.map((item) => ({
//   day: item.day,
//   mood: moodMap[item.mood],
// }))


export default function MoodPage() {
  // const [history, setHistory] = useState(initialHistory)
  // const [today, setToday] = useState('okay')

  // function logToday() {
  //   setHistory((h) => {
  //     const rest = h.slice(0, -1)
  //     return [...rest, { day: 'Today', mood: today }]
  //   })
  // }

  const [history, setHistory] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [streak, setStreak] = useState(0);
  const [alert, setAlert] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMoodData();
  }, []);

  const loadMoodData = async () => {
    try {
      setLoading(true);

      const [
        historyRes,
        weeklyRes,
        monthlyRes,
        streakRes,
        alertRes,
        aiRes,
      ] = await Promise.all([
        getHistory(),
        getWeekly(),
        getMonthly(),
        getStreak(),
        getAlert(),
        getAI(),
      ]);

      // history
      setHistory(historyRes.data.data);

      console.log(historyRes.data.data);


      // weekly chart
      setWeekly(
        weeklyRes.data.data.map((item) => ({
          day: new Date(
            item.createdAt
          ).toLocaleDateString("en-US", {
            weekday: "short",
          }),
          score: item.score,
        }))
      );

      // monthly chart
      setMonthly(monthlyRes.data.data);

      // streak
      setStreak(streakRes.data.streak);

      // alert
      setAlert(alertRes.data);

      // AI
      setAnalysis(aiRes.data.analysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleAddMood = async (
    mood,
    note
  ) => {
    try {
      console.log("Clicked:", mood);

      await addMood({
        mood,
        note,
      });
      // refresh dashboard
      loadMoodData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-purple">Mood tracking</h1>
        <p className="text-sm text-slate-500 mt-1">Log today and browse a simple history.</p>
      </div>

      <section className="w-full md:flex-[7] rounded-2xl bg-gradient-to-br from-amber-700 to-purple-700 dark:from-blue-900/80 dark:to-purple-900/70 border border-amber-800 dark:border-amber-700/50 p-6 text-left">
        <div className="flex flex-wrap gap-2">
          <MoodPrompt handleAddMood={(value) => {
            handleAddMood(value, 'note');
          }} />
        </div>
      </section>


      {/* <section className="rounded-2xl border border-slate-100 dark:border-slate-800 p-4">
        <h2 className="font-semibold text-slate-900 dark:text-purple mb-4">
          Mood trend
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart
              data={weekly}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="day"
              />

              <YAxis
                domain={[1, 4]}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>



          <BarChart
            data={monthly}
          >
            <XAxis
              dataKey="_id.month"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="avg"
            />
          </BarChart>
        </div>



        <Calendar
          tileContent={({
            date,
          }) => {
            const mood =
              history.find(
                m =>
                  new Date(
                    m.createdAt
                  ).toDateString() ===
                  date.toDateString()
              );

            return mood ? (
              <div>
                {
                  {
                    great: "😊",
                    okay: "🙂",
                    low: "😔",
                    rough: "😣",
                  }[
                  mood
                    .mood
                  ]
                }
              </div>
            ) : null;
          }}
        />
      </section>


      <section className="text-left">
        <h2 className="font-semibold text-slate-900 dark:text-purple mb-3">Recent week</h2>
        <ul className="space-y-2">
          {history.map((row, i) => (
            <li
              key={`${row.createdAt}-${i}`}
              className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-2 text-sm"
            >
              <span className="text-black">{row.createdAt}</span>
              <span className="font-medium capitalize text-purple-800 dark:text-purple-500">{row.mood}</span>
            </li>
          ))}
        </ul>
      </section> */}


      {/* Analytics Section */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

{/* Weekly Trend */}
<section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
  <h2 className="text-lg font-semibold mb-5 text-slate-800 dark:text-white">
    Mood Trend
  </h2>

  <div className="h-[320px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={weekly}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis
          domain={[1, 4]}
          ticks={[1, 2, 3, 4]}
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="score"
          strokeWidth={3}
          dot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</section>

{/* Calendar */}
<section className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
  <h2 className="text-lg font-semibold mb-5 text-slate-800 dark:text-white">
    Mood Calendar
  </h2>

  <div className="flex justify-center">
    <Calendar
      className="rounded-xl border-0"
      tileContent={({ date }) => {
        const mood = history.find(
          (m) =>
            new Date(m.createdAt).toDateString() ===
            date.toDateString()
        );

        const emoji = {
          great: "😊",
          okay: "🙂",
          low: "😔",
          rough: "😣",
        }[mood?.mood];

        return emoji ? (
          <div className="text-center text-lg mt-1">
            {emoji}
          </div>
        ) : null;
      }}
    />
  </div>
</section>
</div>


{/* Monthly Chart */}
<section className="mt-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
<h2 className="text-lg font-semibold mb-5 text-slate-800 dark:text-white">
  Monthly Analytics
</h2>

<div className="h-[300px]">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={monthly}>
      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="_id.month" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="avg"
        radius={[8, 8, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>
</section>


{/* Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

<div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
  <div className="text-sm text-slate-500">
    🔥 Streak
  </div>
  <div className="text-3xl font-bold mt-2">
    {streak}
  </div>
</div>

<div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
  <div className="text-sm text-slate-500">
    🚨 Alert
  </div>
  <div className="text-lg font-semibold mt-2">
    {alert?.message || "No concerns"}
  </div>
</div>

<div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
  <div className="text-sm text-slate-500">
    🤖 AI Insight
  </div>
  <div className="mt-2 text-sm">
    {analysis || "No analysis available"}
  </div>
</div>
</div>


{/* History */}
<section className="mt-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
<h2 className="text-lg font-semibold mb-5 text-slate-800 dark:text-white">
  Recent Mood History
</h2>

<div className="space-y-3">
  {history.map((row, i) => (
    <div
      key={`${row.createdAt}-${i}`}
      className="flex justify-between items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800"
    >
      <div>
        <div className="font-medium text-slate-800 dark:text-white">
          {new Date(
            row.createdAt
          ).toLocaleDateString()}
        </div>

        <div className="text-sm text-slate-500">
          {new Date(
            row.createdAt
          ).toLocaleTimeString()}
        </div>
      </div>

      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 capitalize">
        {row.mood}
      </span>
    </div>
  ))}
</div>
</section>
    </div>
  )
}

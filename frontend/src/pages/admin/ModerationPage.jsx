import { useState } from 'react'
import { moderationQueue as initialQueue } from '../../data/mockData'
import { FaCheck, FaTimes, FaFilter } from 'react-icons/fa'

export default function ModerationPage() {
  const [items, setItems] = useState(initialQueue)

  function approve(id) {
    setItems((list) => list.filter((x) => x.id !== id))
  }

  function reject(id) {
    setItems((list) => list.filter((x) => x.id !== id))
  }

  const riskStyles = {
    high: 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200',
    medium:
      'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200',
    low: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Content moderation
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review flagged posts and comments. Actions update local state only until a backend
            exists.
          </p>
        </div>
        <p className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <FaFilter className="h-3.5 w-3.5" />
          {items.length} pending
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 py-16 text-center text-slate-500 dark:text-slate-400">
          <p className="font-medium text-slate-700 dark:text-slate-300">Queue is clear</p>
          <p className="mt-1 text-sm">New items will appear here when you connect moderation APIs.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-slate-600 dark:text-slate-300">
                  {item.type}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                    riskStyles[item.risk] || riskStyles.low
                  }`}
                >
                  {item.risk} risk
                </span>
                <span className="text-xs text-slate-400">#{item.id}</span>
              </div>
              <p className="mt-3 text-slate-700 dark:text-slate-200">{item.preview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => approve(item.id)}
                  className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
                >
                  <FaCheck className="h-3.5 w-3.5" />
                  Approve / dismiss flag
                </button>
                <button
                  type="button"
                  onClick={() => reject(item.id)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <FaTimes className="h-3.5 w-3.5" />
                  Remove content
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

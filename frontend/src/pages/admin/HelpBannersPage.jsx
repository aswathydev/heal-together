import { useState } from 'react'
import { helpRequests as seedHelp } from '../../data/mockData'
import { FaPlus, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa'

function nextId() {
  return `hb-${crypto.randomUUID().slice(0, 8)}`
}

export default function HelpBannersPage() {
  const [banners, setBanners] = useState(() =>
    seedHelp.map((h) => ({
      id: h.id,
      title: h.title,
      message: h.excerpt,
      urgency: h.urgency,
      active: true,
    })),
  )

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [urgency, setUrgency] = useState('medium')

  function addBanner(e) {
    e.preventDefault()
    const t = title.trim()
    const m = message.trim()
    if (!t || !m) return
    setBanners((b) => [
      {
        id: nextId(),
        title: t,
        message: m,
        urgency,
        active: true,
      },
      ...b,
    ])
    setTitle('')
    setMessage('')
    setUrgency('medium')
  }

  function toggleActive(id) {
    setBanners((b) => b.map((x) => (x.id === id ? { ...x, active: !x.active } : x)))
  }

  function remove(id) {
    setBanners((b) => b.filter((x) => x.id !== id))
  }

  const urgencyClass = {
    high: 'bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-200',
    medium:
      'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200',
    low: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200',
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Help banners & requests
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Create urgent messages for the home page ticker and peer-support style requests. Wire
          these to your API when ready.
        </p>
      </div>

      <form
        onSubmit={addBanner}
        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 shadow-sm space-y-4"
      >
        <h3 className="font-semibold text-slate-900 dark:text-white">New banner / request</h3>
        <label className="block text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            placeholder="Short headline"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            placeholder="Text shown on the home marquee or detail view"
          />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">Urgency</span>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="mt-1 w-full max-w-xs rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 px-4 py-2.5 text-sm font-medium text-white hover:opacity-95"
        >
          <FaPlus className="h-3.5 w-3.5" />
          Add to list
        </button>
      </form>

      <section>
        <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">Active list</h3>
        <ul className="space-y-3">
          {banners.map((b) => (
            <li
              key={b.id}
              className={`rounded-2xl border p-4 ${
                b.active
                  ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/80'
                  : 'border-slate-200/60 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/40 opacity-80'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white">{b.title}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{b.message}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                    urgencyClass[b.urgency] || urgencyClass.medium
                  }`}
                >
                  {b.urgency}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => toggleActive(b.id)}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {b.active ? (
                    <>
                      <FaEyeSlash className="h-3 w-3" /> Hide
                    </>
                  ) : (
                    <>
                      <FaEye className="h-3 w-3" /> Show
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => remove(b.id)}
                  className="inline-flex items-center gap-2 rounded-lg border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-3 py-1.5 text-xs font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/50"
                >
                  <FaTrash className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

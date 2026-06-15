import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import heroImage from '../assets/hero_image.png'
import Marquee from "react-fast-marquee/dist";
import MoodPrompt from "../components/home/MoodPrompt";
import { quotes, posts } from '../data/mockData'

export default function HomePage() {
  const daily = quotes[0]

  const moodStyles = {
    great: 'bg-emerald-100 text-emerald-700',
    okay: 'bg-yellow-100 text-yellow-700',
    low: 'bg-blue-100 text-blue-700',
    rough: 'bg-rose-100 text-rose-700',
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="space-y-6">

      {/* 🚨 Announcement */}
      <div className="bg-gradient-to-r from-rose-100 to-orange-100 text-rose-700 py-2 px-4 rounded-xl shadow-sm">
        {mounted && (
          <Marquee.default speed={50} gradient={false}>
            🚨 Urgent: 🩸 A+ blood required for emergency surgery | Location: Kochi | Contact immediately
          </Marquee.default>
        )}
      </div>

      {/* 🌿 Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8 sm:p-12 shadow-sm">

        <div className="flex flex-col-reverse sm:flex-row items-center gap-10">

          {/* LEFT */}
          <div className="w-full sm:w-1/2 text-center sm:text-left">

            <p className="text-indigo-500 text-xs font-semibold uppercase tracking-wider">
              Mental Wellness Platform
            </p>

            <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
              Heal Together,<br />Grow Stronger
            </h1>

            <p className="mt-4 text-slate-600 max-w-md">
              A safe space to share, reflect, and improve your mental well-being
              with AI support, journaling, and a caring community.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">

              <Link
                to="/feed"
                className="rounded-xl bg-indigo-500 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-indigo-600 transition"
              >
                Share thoughts
              </Link>

              <Link
                to="/emergency"
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow hover:bg-slate-50 transition"
              >
                Emergency
              </Link>

            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full sm:w-1/2">
            <img
              src={heroImage}
              className="w-full max-w-md mx-auto drop-shadow-md"
            />
          </div>
        </div>
      </section>

      {/* 💡 Quote + Mood */}
      <section className="flex flex-col md:flex-row gap-6">

        {/* Quote Card */}
        <div className="w-full md:flex-[7] rounded-3xl bg-white p-6 shadow-sm">

          <p className="text-xs font-semibold uppercase text-indigo-400 tracking-wide">
            Quote of the day
          </p>

          <blockquote className="mt-3 text-lg text-slate-800 leading-relaxed">
            “{daily.text}”
          </blockquote>

          <p className="mt-3 text-sm text-slate-500">
            — {daily.author}
          </p>
        </div>

        {/* Mood */}
        <div className="w-full md:flex-[3]">
          <MoodPrompt />
        </div>
      </section>


      {/* 📖 About Section */}
      <section id="about" className="rounded-3xl bg-white p-8 sm:p-10 shadow-sm">
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            About Heal Together
          </h2>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Heal Together is a safe and supportive mental wellness platform designed
            to help you express your thoughts, track your emotions, and connect with
            a compassionate community. Whether you're having a great day or a tough one,
            you're never alone here.
          </p>

          <p className="mt-3 text-slate-500 text-sm">
            Built with empathy, privacy, and care at its core 💙
          </p>

        </div>
      </section>


      {/* ✨ Features Section */}
      <section id="features" className="space-y-6">

        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
            Features that support you
          </h2>
          <p className="mt-2 text-slate-500 text-sm">
            Everything you need for your mental wellness journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Feature 1 */}
          <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-slate-800">📝 Anonymous Sharing</h3>
            <p className="mt-2 text-sm text-slate-600">
              Share your thoughts freely without fear of judgment.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-slate-800">🤖 AI Support</h3>
            <p className="mt-2 text-sm text-slate-600">
              Get gentle guidance and emotional support anytime.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-slate-800">📊 Mood Tracking</h3>
            <p className="mt-2 text-sm text-slate-600">
              Understand your emotional patterns over time.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-slate-800">🌍 Community Support</h3>
            <p className="mt-2 text-sm text-slate-600">
              Connect with people who understand and care.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-slate-800">📔 Journaling</h3>
            <p className="mt-2 text-sm text-slate-600">
              Reflect on your day and express your feelings privately.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-medium text-slate-800">🚨 Emergency Help</h3>
            <p className="mt-2 text-sm text-slate-600">
              Quick access to urgent help and important alerts.
            </p>
          </div>

        </div>
      </section>

      {/* 🌍 Community Posts */}
      <section className="space-y-4">

        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">
            Community posts
          </h2>

          <Link
            to="/feed"
            className="text-sm text-indigo-500 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

          {posts.map((post) => (
            <div
              key={post.id}
              className="min-w-[260px] max-w-[260px] rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
            >

              {/* Header */}
              <div className="flex justify-between mb-2">
                <span className="font-medium text-slate-800 text-sm">
                  {post.user}
                </span>
                <span className="text-xs text-slate-400">
                  {post.time}
                </span>
              </div>

              {/* Mood */}
              <span className={`inline-block text-[10px] px-2 py-1 rounded-full mb-2 ${moodStyles[post.mood]}`}>
                {post.mood}
              </span>

              {/* Text */}
              <p className="text-xs text-slate-600 line-clamp-3">
                {post.text}
              </p>

            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
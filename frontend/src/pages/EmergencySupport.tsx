import React from 'react'
import { FiPhone, FiAlertTriangle, FiMessageCircle } from 'react-icons/fi'

export default function EmergencySupportPage() {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-700">Mental Health Crisis Support</h1>
          <p className="text-slate-600 mt-2">
            If you're feeling overwhelmed, unsafe, or in emotional distress, you are not alone. Immediate, confidential support is available.
          </p>
        </div>

        {/* Emergency Call */}
        <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FiPhone className="text-red-600" />
            <h2 className="text-lg font-semibold text-red-700">Get Immediate Help</h2>
          </div>
          <p className="text-slate-600 text-sm mb-4">
            If you or someone else is at risk of harm, contact emergency services right away for immediate assistance.
          </p>
          <button className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700">
            Call Emergency
          </button>
        </div>

        {/* Helpline */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FiAlertTriangle className="text-yellow-500" />
            <h2 className="text-lg font-semibold text-slate-600">24/7 Mental Health Support Line</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Talk to trained listeners who can support you through anxiety, panic, or emotional distress—any time, day or night.
          </p>
          <button className="w-full bg-yellow-500 text-white py-3 rounded-xl font-medium hover:bg-yellow-600">
            Call Support Line
          </button>
        </div>

        {/* Chat Support
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <FiMessageCircle className="text-teal-600" />
            <h2 className="text-lg font-semibold">Live Chat with a Counselor</h2>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Prefer messaging? Connect with a qualified counselor for real-time, confidential support.
          </p>
          <button className="w-full bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700">
            Start Live Chat
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Grounding Steps You Can Try Now</h2>
          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-2">
            <li>Go to a place where you feel physically safe and comfortable</li>
            <li>Reach out to a trusted friend, family member, or caregiver</li>
            <li>Try slow breathing: inhale for 4 seconds, exhale for 6 seconds</li>
            <li>Stay connected—keep someone on the phone or nearby if possible</li>
          </ul>
        </div> */}

      </div>
    </div>
  )
}

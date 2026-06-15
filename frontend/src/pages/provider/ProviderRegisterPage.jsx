
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerProviderAccount } from '../../lib/providerStore'

export default function ProviderRegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    specialization: '',
    qualification: '',
    licenseNumber: '',
    experienceYears: '',
    services: '',
    bio: '',
  })

  const [certificates, setCertificates] = useState([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function onCertificateChange(event) {
    const files = Array.from(event.target.files ?? [])
    setCertificates(files.map((f) => f.name))
  }

  function onSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (form.password.length < 6) {
      setError('Password should be at least 6 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = registerProviderAccount({ ...form, certificates })

    if (!result.ok) {
      setError(result.error)
      return
    }

    setSuccess('Provider account registered successfully!')
    setTimeout(() => navigate('/login', { replace: true }), 1000)
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4 py-10">
  
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-md border border-slate-300 p-10">
  
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-600">
            Join Heal Together 🌿
          </h1>
          <p className="mt-2 text-slate-500">
            Start your wellness journey today
          </p>
        </div>
  
        {/* Form */}
        <form className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
  
          {error && (
            <p className="md:col-span-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2 text-sm text-rose-600">
              {error}
            </p>
          )}
  
          {success && (
            <p className="md:col-span-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm text-emerald-600">
              {success}
            </p>
          )}
  
          {[
            { key: 'name', placeholder: 'Display Name' },
            { key: 'email', placeholder: 'Email', type: 'email' },
            { key: 'phone', placeholder: 'Phone' },
            { key: 'specialization', placeholder: 'Specialization' },
            { key: 'qualification', placeholder: 'Qualification' },
            { key: 'licenseNumber', placeholder: 'License Number' },
            { key: 'experienceYears', placeholder: 'Experience (Years)', type: 'number' },
            { key: 'services', placeholder: 'Services (comma separated)' },
          ].map((field) => (
            <input
              key={field.key}
              type={field.type || 'text'}
              required
              value={form[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}
  
          {/* Bio */}
          <textarea
            rows={3}
            required
            value={form.bio}
            onChange={(e) => updateField('bio', e.target.value)}
            placeholder="Bio"
            className="md:col-span-2 w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          {/* Certificates */}
          <div className="md:col-span-2">
            <input
              type="file"
              multiple
              onChange={onCertificateChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm"
            />
            {certificates.length > 0 && (
              <p className="mt-2 text-xs text-slate-500">
                {certificates.join(', ')}
              </p>
            )}
          </div>
  
          {/* Password */}
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => updateField('password', e.target.value)}
            placeholder="Password"
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          {/* Confirm Password */}
          <input
            type="password"
            required
            value={form.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            placeholder="Confirm Password"
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          {/* Button */}
          <button
            type="submit"
            className="md:col-span-2 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-4 text-sm font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>
  
        </form>
  
        {/* Footer */}
        <p className="mt-6 text-center text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600">
            Sign in
          </Link>
        </p>
  
      </div>
    </div>
  )


  // return (

  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-8">

  //     <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-slate-200 p-8">

  //       {/* Header */}
  //       <div className="text-center">
  //         <h1 className="text-2xl font-semibold text-slate-900">
  //           Join as Provider 🌿
  //         </h1>
  //         <p className="mt-2 text-sm text-slate-500">
  //           Share your expertise and help others heal
  //         </p>
  //       </div>

  //       {/* Form */}
  //       <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={onSubmit}>

  //         {error && (
  //           <p className="md:col-span-2 rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-700">
  //             {error}
  //           </p>
  //         )}

  //         {success && (
  //           <p className="md:col-span-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-sm text-emerald-700">
  //             {success}
  //           </p>
  //         )}

  //         {[
  //           { key: 'name', label: 'Full Name' },
  //           { key: 'email', label: 'Email', type: 'email' },
  //           { key: 'phone', label: 'Phone' },
  //           { key: 'specialization', label: 'Specialization' },
  //           { key: 'qualification', label: 'Qualification' },
  //           { key: 'licenseNumber', label: 'License Number' },
  //           { key: 'experienceYears', label: 'Experience (Years)', type: 'number' },
  //           { key: 'services', label: 'Services (comma separated)' },
  //         ].map((field) => (
  //           <label key={field.key} className="block text-left">
  //             <span className="text-sm font-medium text-slate-700">
  //               {field.label}
  //             </span>
  //             <input
  //               type={field.type || 'text'}
  //               required
  //               value={form[field.key]}
  //               onChange={(e) => updateField(field.key, e.target.value)}
  //               className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
  //             />
  //           </label>
  //         ))}

  //         {/* Bio */}
  //         <label className="block text-left md:col-span-2">
  //           <span className="text-sm font-medium text-slate-700">
  //             Bio
  //           </span>
  //           <textarea
  //             rows={3}
  //             required
  //             value={form.bio}
  //             onChange={(e) => updateField('bio', e.target.value)}
  //             className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
  //           />
  //         </label>

  //         {/* Certificates */}
  //         <label className="block text-left md:col-span-2">
  //           <span className="text-sm font-medium text-slate-700">
  //             Upload Certificates
  //           </span>
  //           <input
  //             type="file"
  //             multiple
  //             onChange={onCertificateChange}
  //             className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm"
  //           />
  //           {certificates.length > 0 && (
  //             <p className="mt-2 text-xs text-slate-500">
  //               {certificates.join(', ')}
  //             </p>
  //           )}
  //         </label>

  //         {/* Password */}
  //         <label className="block text-left">
  //           <span className="text-sm font-medium text-slate-700">
  //             Password
  //           </span>
  //           <input
  //             type="password"
  //             required
  //             value={form.password}
  //             onChange={(e) => updateField('password', e.target.value)}
  //             className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
  //           />
  //         </label>

  //         {/* Confirm Password */}
  //         <label className="block text-left">
  //           <span className="text-sm font-medium text-slate-700">
  //             Confirm Password
  //           </span>
  //           <input
  //             type="password"
  //             required
  //             value={form.confirmPassword}
  //             onChange={(e) => updateField('confirmPassword', e.target.value)}
  //             className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400 outline-none transition"
  //           />
  //         </label>

  //         {/* Button */}
  //         <button
  //           type="submit"
  //           className="md:col-span-2 w-full rounded-lg bg-teal-500 text-white py-2.5 text-sm font-medium hover:bg-teal-600 transition"
  //         >
  //           Register as Provider
  //         </button>

  //       </form>

  //       {/* Footer */}
  //       <p className="mt-6 text-center text-sm text-slate-500">
  //         Already have an account?{' '}
  //         <Link to="/login" className="text-teal-600 hover:underline">
  //           Sign in
  //         </Link>
  //       </p>

  //     </div>
  //   </div>
  // )
}
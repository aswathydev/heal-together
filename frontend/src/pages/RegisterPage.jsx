import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function validate() {
    if (!form.name.trim()) return 'Name is required'
    if (!form.email.includes('@')) return 'Enter valid email'
    if (form.password.length < 6) return 'Password must be at least 6 characters'
    if (form.password !== form.confirmPassword) return 'Passwords do not match'
    return ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    // 🔥 Replace this with real API later
    const newUser = {
      email: form.email,
      role: 'member',
    }

    localStorage.setItem('mw_auth', JSON.stringify(newUser))

    setSuccess('Account created successfully!')

    setTimeout(() => {
      navigate('/login', { replace: true })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-teal-50 px-4">
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-700">
            Join Heal Together 🌿
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Start your wellness journey today
          </p>
        </div>
  
        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          
          {error && (
            <p className="bg-red-100 text-red-600 px-3 py-2 rounded-xl text-sm">
              {error}
            </p>
          )}
  
          {success && (
            <p className="bg-green-100 text-green-600 px-3 py-2 rounded-xl text-sm">
              {success}
            </p>
          )}
  
          {/* Name */}
          <input
            type="text"
            placeholder="Display Name"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField('password', e.target.value)}
            className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />
  
          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-3 text-sm font-medium hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>
  
        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600">
            Sign in
          </Link>
        </p>
  
        <p className="mt-2 text-center text-sm text-slate-500">
          Provider?{' '}
          <Link to="/provider/register" className="text-indigo-600">
            Register as provider
          </Link>
        </p>
      </div>
    </div>
  )

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-teal-50 px-4">
  //     <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border p-8">
        
  //       {/* Header */}
  //       <div className="text-center">
  //         <h1 className="text-2xl font-semibold">Join Heal Together 🌿</h1>
  //         <p className="mt-2 text-sm text-slate-500">
  //           Start your wellness journey today
  //         </p>
  //       </div>

  //       {/* Form */}
  //       <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          
  //         {error && (
  //           <p className="bg-red-100 text-red-600 px-3 py-2 rounded-xl text-sm">
  //             {error}
  //           </p>
  //         )}

  //         {success && (
  //           <p className="bg-green-100 text-green-600 px-3 py-2 rounded-xl text-sm">
  //             {success}
  //           </p>
  //         )}

  //         {/* Name */}
  //         <input
  //           type="text"
  //           placeholder="Display Name"
  //           value={form.name}
  //           onChange={(e) => updateField('name', e.target.value)}
  //           className="w-full rounded-xl border px-3 py-2.5 text-sm"
  //         />

  //         {/* Email */}
  //         <input
  //           type="email"
  //           placeholder="Email"
  //           value={form.email}
  //           onChange={(e) => updateField('email', e.target.value)}
  //           className="w-full rounded-xl border px-3 py-2.5 text-sm"
  //         />

  //         {/* Password */}
  //         <input
  //           type="password"
  //           placeholder="Password"
  //           value={form.password}
  //           onChange={(e) => updateField('password', e.target.value)}
  //           className="w-full rounded-xl border px-3 py-2.5 text-sm"
  //         />

  //         {/* Confirm Password */}
  //         <input
  //           type="password"
  //           placeholder="Confirm Password"
  //           value={form.confirmPassword}
  //           onChange={(e) => updateField('confirmPassword', e.target.value)}
  //           className="w-full rounded-xl border px-3 py-2.5 text-sm"
  //         />

  //         {/* Button */}
  //         <button
  //           type="submit"
  //           className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-2.5 text-sm font-medium"
  //         >
  //           Create Account
  //         </button>
  //       </form>

  //       {/* Footer */}
  //       <p className="mt-6 text-center text-sm text-slate-500">
  //         Already have an account?{' '}
  //         <Link to="/login" className="text-teal-600 hover:underline">
  //           Sign in
  //         </Link>
  //       </p>

  //       <p className="mt-2 text-center text-sm text-slate-500">
  //         Provider?{' '}
  //         <Link to="/provider/register" className="text-indigo-600 hover:underline">
  //           Register as provider
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // )
}
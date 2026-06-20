import React, { useState } from "react";
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Simple robust email validation matching registration layout
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      
      // TODO: Replace with your actual dispatch or API call 
      // await dispatch(forgotPassword(email)).unwrap();
      
      // Simulating successful API trigger
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSuccess("Password reset link has been sent to your email!");
      setEmail("");
    } catch (err) {
      setError(err || "Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-slate-300 p-10">
  
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-600">
            Reset Password 🌿
          </h1>
          <p className="mt-2 text-slate-500 text-sm leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
  
        {/* Form */}
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          
          {error && (
            <p className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-2 text-sm text-rose-600 text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm text-emerald-600 text-center">
              {success}
            </p>
          )}
  
          {/* Email Input */}
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="email"
              disabled={loading}
              required
              className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60"
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-4 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>
  
        {/* Navigation Footers */}
        <p className="mt-6 text-center text-slate-500">
          Remember your password?{' '}
          <Link
            to="/login"
            className="font-medium text-teal-600 hover:underline"
          >
            Back to Sign In
          </Link>
        </p>
  
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
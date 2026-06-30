import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authThunk";
import { clearError } from "../redux/slices/authSlice";
import { Link, useLocation, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Grab auth state from Redux
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  // 2. Local form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 3. Clear errors when the component unmounts to prevent stale error messages
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // 4. Redirect user to dashboard/home if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'user') {
        navigate("/")
      } else {
        navigate("/provider/dashboard")
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).unwrap();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-md border border-slate-300 p-10">

        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-600">
            Join Heal Together 🌿
          </h1>
          <p className="mt-2 text-slate-500">
            Start your wellness journey today
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {/* {error && (
            <p
              className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-2 text-sm text-rose-600"
              role="alert"
            >
              {error}
            </p>
          )} */}
          {error && <div style={styles.errorAlert}>{error}</div>}

          {/* Email */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email"
            disabled={loading}
            required
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />

          {/* Password */}
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="current-password"
            required
            disabled={loading}
            className="w-full rounded-2xl border border-slate-300 bg-slate-100 px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex justify-end mt-2 px-1">
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-slate-400 hover:text-indigo-500 transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-4 text-sm font-medium hover:opacity-90 transition"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-center text-slate-500">
          Don’t have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-teal-600"
          >
            Create one
          </Link>
        </p>

        <p className="mt-2 text-center text-slate-500">
          Provider?{' '}
          <Link
            to="/provider/register"
            className="font-medium text-indigo-600"
          >
            Register as provider
          </Link>
        </p>

      </div>
    </div>
  )
};

// Basic layout styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    borderRadius: "8px",
  },
  inputGroup: {
    marginBottom: "1.25rem",
    display: "flex",
    flexDirection: "column",
  },
  errorAlert: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: "0.75rem",
    borderRadius: "4px",
    marginBottom: "1rem",
    fontSize: "0.875rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default LoginPage;
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { authenticate } from '../auth/credentials'

const STORAGE_KEY = 'mw_auth'

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      typeof parsed.email === 'string' &&
      (parsed.role === 'admin' ||
        parsed.role === 'member' ||
        parsed.role === 'provider')
    ) {
      return { email: parsed.email, role: parsed.role }
    }
  } catch {
    /* ignore */
  }
  return null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())

  const login = useCallback((email, password, allowedRoles = []) => {
    const account = authenticate(email, password)
  
    if (!account) {
      return { ok: false, error: 'Invalid email or password.' }
    }
  
    // 🚨 Restrict roles here
    if (allowedRoles.length && !allowedRoles.includes(account.role)) {
      return { ok: false, error: 'Access denied for this login.' }
    }
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(account))
    setUser(account)
  
    return { ok: true, role: account.role }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAdmin: user?.role === 'admin',
      isProvider: user?.role === 'provider',
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/* useAuth is intentionally co-located with AuthProvider for this app size. */
// eslint-disable-next-line react-refresh/only-export-components -- hook + provider pair
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

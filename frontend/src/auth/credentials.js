/**
 * Demo-only auth. Replace with a real API before production.
 * Optional env: VITE_ADMIN_EMAIL, VITE_ADMIN_PASSWORD, VITE_MEMBER_EMAIL, VITE_MEMBER_PASSWORD
 * (Vite exposes VITE_* to the client — not secret in production builds.)
 */
import { authenticateProvider } from '../lib/providerStore'

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL ?? 'admin@healtogether.local'
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin123'
const memberEmail = import.meta.env.VITE_MEMBER_EMAIL ?? 'member@healtogether.local'
const memberPassword = import.meta.env.VITE_MEMBER_PASSWORD ?? 'member123'

export function authenticate(email, password) {
  const e = email.trim().toLowerCase()
  const p = password
  if (e === adminEmail.trim().toLowerCase() && p === adminPassword) {
    return { email: email.trim(), role: 'admin' }
  }
  if (e === memberEmail.trim().toLowerCase() && p === memberPassword) {
    return { email: email.trim(), role: 'member' }
  }
  const provider = authenticateProvider(email, password)
  if (provider) {
    return { email: provider.email, role: 'provider' }
  }
  return null
}

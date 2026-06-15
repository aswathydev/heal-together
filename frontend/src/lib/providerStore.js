import { providers as mockProviders } from '../data/mockData'

const PROVIDER_KEY = 'mw_provider_accounts_v1'

function readProviders() {
  try {
    const raw = localStorage.getItem(PROVIDER_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeProviders(list) {
  localStorage.setItem(PROVIDER_KEY, JSON.stringify(list))
}

function seedIfNeeded() {
  if (localStorage.getItem(PROVIDER_KEY)) return
  const seeded = mockProviders.map((p, idx) => ({
    id: p.id,
    name: p.name,
    email: idx === 0 ? 'samira@healtogether.local' : 'jordan@healtogether.local',
    password: 'provider123',
    specialization: p.role,
    qualification: 'Licensed Professional',
    licenseNumber: idx === 0 ? 'LIC-SAM-001' : 'LIC-JOR-002',
    experienceYears: idx === 0 ? 8 : 6,
    phone: '',
    bio: p.bio,
    services: p.services,
    certificates: [],
    availability: [],
  }))
  writeProviders(seeded)
}

export function getAllProviderAccounts() {
  seedIfNeeded()
  return readProviders()
}

export function authenticateProvider(email, password) {
  const normalized = email.trim().toLowerCase()
  return getAllProviderAccounts().find(
    (p) => p.email.trim().toLowerCase() === normalized && p.password === password,
  ) ?? null
}

export function getProviderById(id) {
  return getAllProviderAccounts().find((p) => p.id === id) ?? null
}

export function getProviderByEmail(email) {
  const normalized = email.trim().toLowerCase()
  return getAllProviderAccounts().find(
    (p) => p.email.trim().toLowerCase() === normalized,
  ) ?? null
}

export function registerProviderAccount(data) {
  const all = getAllProviderAccounts()
  const email = data.email.trim().toLowerCase()
  if (all.some((p) => p.email.trim().toLowerCase() === email)) {
    return { ok: false, error: 'Provider email already exists.' }
  }

  const row = {
    id: `pr-${crypto.randomUUID().slice(0, 8)}`,
    name: data.name.trim(),
    email,
    password: data.password,
    specialization: data.specialization.trim(),
    qualification: data.qualification.trim(),
    licenseNumber: data.licenseNumber.trim(),
    experienceYears: Number(data.experienceYears) || 0,
    phone: data.phone.trim(),
    bio: data.bio.trim(),
    services: data.services
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    certificates: data.certificates ?? [],
    availability: [],
  }
  all.push(row)
  writeProviders(all)
  return { ok: true, provider: row }
}

export function addAvailabilitySlot(providerId, date, time) {
  const all = getAllProviderAccounts()
  const idx = all.findIndex((p) => p.id === providerId)
  if (idx === -1) return
  const slotExists = all[idx].availability.some((s) => s.date === date && s.time === time)
  if (slotExists) return
  all[idx].availability.push({
    id: `slot-${crypto.randomUUID().slice(0, 10)}`,
    date,
    time,
    available: true,
  })
  all[idx].availability.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
  writeProviders(all)
}

export function toggleAvailabilitySlot(providerId, slotId) {
  const all = getAllProviderAccounts()
  const idx = all.findIndex((p) => p.id === providerId)
  if (idx === -1) return
  all[idx].availability = all[idx].availability.map((slot) =>
    slot.id === slotId ? { ...slot, available: !slot.available } : slot,
  )
  writeProviders(all)
}

export function removeAvailabilitySlot(providerId, slotId) {
  const all = getAllProviderAccounts()
  const idx = all.findIndex((p) => p.id === providerId)
  if (idx === -1) return
  all[idx].availability = all[idx].availability.filter((slot) => slot.id !== slotId)
  writeProviders(all)
}

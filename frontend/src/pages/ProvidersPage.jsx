import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getAllProviders } from "../services/providerService";


export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchProviders();
}, []);

const fetchProviders = async () => {
  try {
    const response = await getAllProviders();

    console.log('PROVIDERS 11:11', response.data);

    setProviders(response.data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};




  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Service Providers
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Find the right support for your needs.
        </p>
      </div>

      {/* Grid */}
      <ul className="grid gap-5 md:grid-cols-2">
        {providers.map((p) => (
          <li key={p._id}>
            <ProviderCard provider={p} />
          </li>
        ))}
      </ul>
    </div>
  )
}


function ProviderCard({ provider: p }) {
  return (
    <div className="group rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition p-5">

      {/* Top Section */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-lg text-slate-900">
            {p.name}
          </h2>
          <p className="text-sm text-slate-500">{p.role}</p>
        </div>

        <div className="text-right text-sm">
          <div className="font-semibold text-amber-500">
            ★ {p.rating}
          </div>
          <div className="text-slate-400 text-xs">
            {p.reviews} reviews
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        {p.bio}
      </p>

      {/* Services */}
      <div className="mt-4 flex flex-wrap gap-2">
        {p.services.map((s) => (
          <span
            key={s}
            className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600"
          >
            {s}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to={`/providers/${p._id}`}
        className="mt-5 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
      >
        View profile →
      </Link>
    </div>
  )
}
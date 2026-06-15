// import { Link } from 'react-router-dom'
// import { providers } from '../data/mockData'

// export default function ProvidersPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-900 dark:text-purple">Service providers</h1>
//       </div>

//       <ul className="grid gap-4 md:grid-cols-2">
//         {providers.map((p) => (
//           <li
//             key={p.id}
//             className="rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-teal-50 dark:from-indigo-950/40 dark:via-slate-900 dark:to-teal-950/40 border border-white-100/70 dark:border-white-800 p-6 sm:p-10"
//           >
//             <div className="flex items-start justify-between gap-2">
//               <div>
//                 <h2 className="font-semibold text-lg text-slate-900 dark:text-white">{p.name}</h2>
//                 <p className="text-sm text-slate-500">{p.role}</p>
//               </div>
//               <div className="text-right text-sm">
//                 <div className="font-medium text-amber-600">★ {p.rating}</div>
//                 <div className="text-slate-400">{p.reviews} reviews</div>
//               </div>
//             </div>
//             <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{p.bio}</p>
//             <div className="mt-3 flex flex-wrap gap-2">
//               {p.services.map((s) => (
//                 <span
//                   key={s}
//                   className="text-xs rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-slate-600 dark:text-slate-300"
//                 >
//                   {s}
//                 </span>
//               ))}
//             </div>
//             <Link
//               to={`/providers/${p.id}`}
//               className="mt-4 inline-block text-sm font-medium text-teal-700 dark:text-teal-300 hover:underline"
//             >
//               View profile & reviews →
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }



import { Link } from 'react-router-dom'
import { providers } from '../data/mockData'

export default function ProvidersPage() {
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
          <li key={p.id}>
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
        to={`/providers/${p.id}`}
        className="mt-5 inline-block text-sm font-medium text-teal-600 hover:text-teal-700"
      >
        View profile →
      </Link>
    </div>
  )
}
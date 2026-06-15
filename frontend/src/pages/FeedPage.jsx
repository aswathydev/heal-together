// import { useState } from 'react'
// import { feedPosts as initial } from '../data/mockData'

// export default function FeedPage() {
//   const [posts, setPosts] = useState(initial)
//   const [body, setBody] = useState('')
//   const [anonymous, setAnonymous] = useState(false)

//   function toggleLike(id) {
//     setPosts((p) =>
//       p.map((post) => (post.id === id ? { ...post, likes: post.likes + 1 } : post)),
//     )
//   }

//   function addPost(e) {
//     e.preventDefault()
//     const t = body.trim()
//     if (!t) return
//     setPosts([
//       {
//         id: crypto.randomUUID(),
//         author: anonymous ? 'Anonymous' : 'You',
//         anonymous,
//         body: t,
//         likes: 0,
//         comments: 0,
//         time: 'Just now',
//       },
//       ...posts,
//     ])
//     setBody('')
//   }

//   return (
//     <div className="max-w-2xl mx-auto space-y-8">
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-900 dark:text-purple">Community feed</h1>
//         <p className="text-sm text-slate-500 mt-1">Like, comment, and post anonymously.</p>
//       </div>

//       <form onSubmit={addPost} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-4 text-left space-y-3">
//         <label className="block">
//           <span className="text-sm font-medium text-slate-700 dark:text-slate-200">New post</span>
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             rows={3}
//             className="mt-1 w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
//             placeholder="Share something kind or honest…"
//           />
//         </label>
//         <label className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
//           <input
//             type="checkbox"
//             checked={anonymous}
//             onChange={(e) => setAnonymous(e.target.checked)}
//             className="rounded border-slate-300"
//           />
//           Post anonymously
//         </label>
//         <div>
//           <button
//             type="submit"
//             className="rounded-xl bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-700"
//           >
//             Publish
//           </button>
//         </div>
//       </form>

//       <ul className="space-y-4">
//         {posts.map((post) => (
//           <li
//             key={post.id}
//             className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/40 p-4 text-left"
//           >
//             <div className="flex items-center gap-2 text-sm">
//               <span className="font-medium text-slate-900 dark:text-white">
//                 {post.anonymous ? 'Anonymous' : post.author}
//               </span>
//               <span className="text-slate-400">· {post.time}</span>
//             </div>
//             <p className="mt-2 text-slate-700 dark:text-slate-200">{post.body}</p>
//             <div className="mt-3 flex flex-wrap gap-4 text-sm">
//               <button
//                 type="button"
//                 onClick={() => toggleLike(post.id)}
//                 className="text-teal-700 dark:text-teal-300 font-medium hover:underline"
//               >
//                 Like · {post.likes}
//               </button>
//               <button type="button" className="text-slate-500 hover:underline">
//                 Comment · {post.comments}
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }



import { useState } from 'react'
import { feedPosts as initial } from '../data/mockData'

export default function FeedPage() {
  const [posts, setPosts] = useState(initial)
  const [body, setBody] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  function toggleLike(id) {
    setPosts((p) =>
      p.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    )
  }

  function addPost(e) {
    e.preventDefault()
    const t = body.trim()
    if (!t) return
    setPosts([
      {
        id: crypto.randomUUID(),
        author: anonymous ? 'Anonymous' : 'You',
        anonymous,
        body: t,
        likes: 0,
        comments: 0,
        time: 'Just now',
      },
      ...posts,
    ])
    setBody('')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Community feed
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Like, comment, and post anonymously.
        </p>
      </div>

      {/* Create Post */}
      <form
        onSubmit={addPost}
        className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5 space-y-4"
      >
        <label className="block">
          <span className="text-sm font-medium text-slate-700">
            New post
          </span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            placeholder="Share something kind or honest…"
          />
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="rounded border-slate-300"
          />
          Post anonymously
        </label>

        <div>
          <button
            type="submit"
            className="rounded-xl bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-700 transition"
          >
            Publish
          </button>
        </div>
      </form>

      {/* Feed */}
      <ul className="space-y-5">
        {posts.map((post) => (
          <li
            key={post.id}
            className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5"
          >
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-slate-900">
                {post.anonymous ? 'Anonymous' : post.author}
              </span>
              <span className="text-slate-400">· {post.time}</span>
            </div>

            <p className="mt-3 text-slate-700 leading-relaxed">
              {post.body}
            </p>

            <div className="mt-4 flex flex-wrap gap-5 text-sm">
              <button
                type="button"
                onClick={() => toggleLike(post.id)}
                className="text-teal-600 font-medium hover:text-teal-700 transition"
              >
                Like · {post.likes}
              </button>

              <button
                type="button"
                className="text-slate-500 hover:text-slate-700 transition"
              >
                Comment · {post.comments}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
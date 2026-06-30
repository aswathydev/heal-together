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



// import { useState } from 'react'
// import { feedPosts as initial } from '../data/mockData'

// export default function FeedPage() {
//   const [posts, setPosts] = useState(initial)
//   const [body, setBody] = useState('')
//   const [anonymous, setAnonymous] = useState(false)

//   function toggleLike(id) {
//     setPosts((p) =>
//       p.map((post) =>
//         post.id === id ? { ...post, likes: post.likes + 1 } : post
//       )
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
//     <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-semibold text-slate-900">
//           Community feed
//         </h1>
//         <p className="text-sm text-slate-500 mt-1">
//           Like, comment, and post anonymously.
//         </p>
//       </div>

//       {/* Create Post */}
//       <form
//         onSubmit={addPost}
//         className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5 space-y-4"
//       >
//         <label className="block">
//           <span className="text-sm font-medium text-slate-700">
//             New post
//           </span>
//           <textarea
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//             rows={3}
//             className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
//             placeholder="Share something kind or honest…"
//           />
//         </label>

//         <label className="inline-flex items-center gap-2 text-sm text-slate-600">
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
//             className="rounded-xl bg-teal-600 text-white px-4 py-2 text-sm font-medium hover:bg-teal-700 transition"
//           >
//             Publish
//           </button>
//         </div>
//       </form>

//       {/* Feed */}
//       <ul className="space-y-5">
//         {posts.map((post) => (
//           <li
//             key={post.id}
//             className="rounded-2xl bg-white shadow-sm border border-slate-100 p-5"
//           >
//             <div className="flex items-center gap-2 text-sm">
//               <span className="font-medium text-slate-900">
//                 {post.anonymous ? 'Anonymous' : post.author}
//               </span>
//               <span className="text-slate-400">· {post.time}</span>
//             </div>

//             <p className="mt-3 text-slate-700 leading-relaxed">
//               {post.body}
//             </p>

//             <div className="mt-4 flex flex-wrap gap-5 text-sm">
//               <button
//                 type="button"
//                 onClick={() => toggleLike(post.id)}
//                 className="text-teal-600 font-medium hover:text-teal-700 transition"
//               >
//                 Like · {post.likes}
//               </button>

//               <button
//                 type="button"
//                 className="text-slate-500 hover:text-slate-700 transition"
//               >
//                 Comment · {post.comments}
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react';
import axiosInstance from "../api/axiosInstance";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');



  // Fetch feed on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Axios automatically runs res.json() under the hood; data is directly accessible
      const response = await axiosInstance.get('/posts');
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching feed:", err.response?.data?.message || err.message);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await axiosInstance.post('/posts', { 
        content, 
        isAnonymous 
      });

      // Axios returns the HTTP status directly via response.status
      if (response.status === 201 && response.data.post?.isFlagged) {
        // Post was flagged by backend AI
        setMessage({ type: 'warning', text: response.data.message });
      } else {
        // Post went through successfully
        setContent('');
        setIsAnonymous(false);
        fetchPosts(); 
      }
    } catch (err) {
      console.error("Error creating post:", err.response?.data?.message || err.message);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axiosInstance.put(`/posts/${postId}/like`);
      
      // Update local state smoothly using response data
      setPosts(posts.map(post => {
        if (post._id === postId) {
          return { ...post, likes: response.data.likes };
        }
        return post;
      }));
    } catch (err) {
      console.error("Error toggling like:", err.response?.data?.message || err.message);
    }
  };



  // const API_URL = '/api/posts'; // Match backend configuration path

  // useEffect(() => {
  //   fetchFeed();
  // }, []);

  // const fetchFeed = async () => {
  //   try {
  //     const res = await fetch(API_URL, {
  //       headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     const data = await res.json();
  //     if (res.ok) setPosts(data);
  //   } catch (err) {
  //     console.error("Error fetching feed:", err);
  //   }
  // };

  // const handleCreatePost = async (e) => {
  //   e.preventDefault();
  //   setMessage('');

  //   try {
  //     const res = await fetch(API_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       },
  //       body: JSON.stringify({ content, isAnonymous })
  //     });
  //     const newPost = await res.json();

  //     if (res.ok) {
  //       if (newPost.isFlagged) {
  //         setMessage('⚠️ Your post was submitted but flagged by safety filters for admin review.');
  //       } else {
  //         setContent('');
  //         setIsAnonymous(false);
  //         fetchFeed(); // Refresh view
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Post processing error:", err);
  //   }
  // };

  // const handleLike = async (postId) => {
  //   try {
  //     const res = await fetch(`${API_URL}/${postId}/like`, {
  //       method: 'PUT',
  //       headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //     });
  //     if (res.ok) fetchFeed(); // Refresh counts dynamically
  //   } catch (err) {
  //     console.error("Like toggle failure:", err);
  //   }
  // };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Heal Together Community Feed</h2>
      <p style={{ color: '#777' }}>Share your journey, support peers, or read along completely anonymously.</p>

      {/* NEW POST FORM */}
      <form onSubmit={handleCreatePost} style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Encouraging words or personal updates welcome..."
          rows="4"
          style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px', resize: 'none', boxSizing: 'border-box' }}
          required
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={isAnonymous} 
              onChange={(e) => setIsAnonymous(e.target.checked)} 
            />
            Post Anonymously 🕵️
          </label>

          <button type="submit" style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Share to Feed
          </button>
        </div>
      </form>

      {message && <div style={{ background: '#fff3cd', color: '#856404', padding: '12px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>{message}</div>}

      {/* POST LIST VIEW */}
      <div>
        {posts.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#aaa', textAlign: 'center' }}>No posts in the circle yet. Be the first!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} style={{ background: '#fff', border: '1px solid #eee', padding: '20px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold', color: post.isAnonymous ? '#7f8c8d' : '#2c3e50' }}>
                  {post.isAnonymous ? '🕵️ Anonymous Peer' : `@${post.userId?.username || 'User'}`}
                </span>
                <small style={{ color: '#aaa' }}>{new Date(post.createdAt).toLocaleDateString()}</small>
              </div>

              <p style={{ color: '#333', lineHeight: '1.5', margin: '0 0 15px 0' }}>{post.content}</p>

              <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '10px' }}>
                <button 
                  onClick={() => handleLike(post._id)}
                  style={{ background: '#f8f9fa', border: '1px solid #ddd', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  ❤️ <span>{post.likes?.length || 0}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
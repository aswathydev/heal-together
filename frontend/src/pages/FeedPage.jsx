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
      console.log('posts', response);
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


  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
  
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Heal Together Community
        </h1>
  
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Share your journey, encourage others, and find support in a safe space.
        </p>
      </div>
  
      <div className="grid lg:grid-cols-3 gap-8">
  
        {/* CREATE POST */}
        <div className="lg:col-span-1">
  
          <div className="
            bg-gradient-to-br
            from-blue-50
            via-white
            to-purple-50
            dark:from-slate-900
            dark:via-slate-800
            dark:to-purple-950/30
            rounded-3xl
            shadow-lg
            border border-slate-200 dark:border-slate-800
            p-6
            sticky top-6
          ">
  
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Share Your Thoughts
              </h2>
  
              <p className="text-sm text-slate-500 mt-1">
                Your voice matters.
              </p>
            </div>
  
            <form
              onSubmit={handleCreatePost}
              className="space-y-5"
            >
  
              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                placeholder="What's on your mind today?"
                rows={6}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-slate-300
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  p-4
                  resize-none
                  outline-none
                  focus:ring-2
                  focus:ring-purple-500
                "
              />
  
              <label className="
                flex
                items-center
                gap-3
                cursor-pointer
                rounded-xl
                bg-white/70
                dark:bg-slate-800
                p-3
              ">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) =>
                    setIsAnonymous(
                      e.target.checked
                    )
                  }
                  className="h-5 w-5"
                />
  
                <span>
                  🕵️ Post anonymously
                </span>
              </label>
  
              <button
                type="submit"
                className="
                  w-full
                  py-4
                  rounded-xl
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-blue-500
                  to-purple-600
                  hover:scale-[1.02]
                  transition
                  shadow-lg
                "
              >
                Share to Community
              </button>
  
            </form>
  
            {message && (
              <div className="
                mt-5
                rounded-xl
                bg-amber-50
                border
                border-amber-200
                p-4
                text-amber-700
              ">
                ⚠️ {message}
              </div>
            )}
          </div>
        </div>
  
        {/* FEED */}
        <div className="lg:col-span-2">
  
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold  text-purple-700">
              Community Feed
            </h2>
  
            <div className="
              px-4 py-2
              rounded-full
              bg-purple-100
              dark:bg-purple-900
              text-purple-700
              dark:text-purple-300
            ">
              {posts.length} posts
            </div>
          </div>
  
          <div className="space-y-6">
  
            {posts.length === 0 && (
              <div className="
                text-center
                py-20
                bg-white
                dark:bg-slate-900
                rounded-3xl
                border
                border-slate-200
                dark:border-slate-800
              ">
                <div className="text-6xl mb-4">
                  💙
                </div>
  
                <h3 className="text-xl font-semibold">
                  No posts yet
                </h3>
  
                <p className="text-slate-500 mt-2">
                  Be the first to share.
                </p>
              </div>
            )}
  
            {posts.map((post) => (
              <div
                key={post._id}
                className="
                  bg-white
                  dark:bg-slate-900
                  rounded-3xl
                  shadow-sm
                  hover:shadow-lg
                  transition
                  border
                  border-slate-200
                  dark:border-slate-800
                  p-6
                "
              >
  
                {/* HEADER */}
                <div className="
                  flex
                  justify-between
                  items-start
                  mb-5
                ">
  
                  <div className="flex items-center gap-4">
  
                    <div className="
                      h-12
                      w-12
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                    ">
                      {post.isAnonymous
                        ? "🕵️"
                        : "👤"}
                    </div>
  
                    <div>
                      <div className="
                        font-semibold
                      ">
                        {post.isAnonymous
                          ? "Anonymous Peer"
                          : post.userId?.name ||
                            "Community Member"}
                      </div>
  
                      <div className="
                        text-sm
                        text-slate-500
                      ">
                        {new Date(
                          post.createdAt
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
  
                </div>
  
                {/* CONTENT */}
                <div className="
                  text-slate-700
                  dark:text-slate-300
                  leading-7
                  whitespace-pre-wrap
                ">
                  {post.content}
                </div>
  
                {/* ACTIONS */}
                <div className="
                  mt-6
                  pt-4
                  border-t
                  border-slate-100
                  dark:border-slate-800
                  flex
                  gap-3
                ">
  
                  <button
                    onClick={() =>
                      handleLike(post._id)
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2
                      rounded-full
                      bg-slate-100
                      dark:bg-slate-800
                      hover:scale-105
                      transition
                    "
                  >
                    ❤️
  
                    <span className="font-medium">
                      {post.likes?.length || 0}
                    </span>
                  </button>

                  <button
            className="
              px-4 py-2
              rounded-full
              bg-slate-100
              dark:bg-slate-800
              text-sm
              hover:bg-purple-100
              dark:hover:bg-purple-900
              transition
            "
          >
            Report
          </button>
  
                </div>
              </div>
            ))}
  
          </div>
        </div>
      </div>
    </div>
  );
}
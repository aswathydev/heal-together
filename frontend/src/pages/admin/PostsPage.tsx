
import React, { useState } from "react";

const samplePosts = [
  {
    id: 1,
    content: "This app really helped me today 💙",
    hidden: false,
    flagged: false,
    comments: 3,
  },
  {
    id: 2,
    content: "I feel overwhelmed and need advice",
    hidden: false,
    flagged: true,
    comments: 5,
  },
  {
    id: 3,
    content: "Negative content example",
    hidden: true,
    flagged: true,
    comments: 1,
  },
];

export default function PostsPage() {
  const [posts, setPosts] = useState(samplePosts);
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleHide = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, hidden: !p.hidden } : p
      )
    );
  };

  const filteredPosts = showFlaggedOnly
    ? posts.filter((p) => p.flagged)
    : posts;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Posts</h2>

        <button
          onClick={() => setShowFlaggedOnly(!showFlaggedOnly)}
          className="text-sm px-3 py-1 border rounded"
        >
          {showFlaggedOnly ? "Show All" : "Show Flagged"}
        </button>
      </div>

      <div className="overflow-hidden border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-slate-500">Content</th>
              <th className="px-4 py-2 text-slate-500">Comments</th>
              <th className="px-4 py-2 text-slate-500">Status</th>
              <th className="px-4 py-2 text-slate-500">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPosts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">{p.content}</td>

                <td className="px-4 py-3 text-center">{p.comments}</td>

                <td className="px-4 py-3 text-center">
                  <div className="flex flex-col items-center gap-1">
                    {p.hidden && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                        Hidden
                      </span>
                    )}
                    {p.flagged && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                        Flagged
                      </span>
                    )}
                    {!p.hidden && !p.flagged && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Clean
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => deletePost(p.id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => toggleHide(p.id)}
                    className="text-yellow-600 text-xs"
                  >
                    {p.hidden ? "Unhide" : "Hide"}
                  </button>

                  <button className="text-blue-600 text-xs">
                    View Comments
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
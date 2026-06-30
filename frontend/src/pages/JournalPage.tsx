import React, { useState, useEffect } from 'react';
// Import your configured axios instance
import axiosInstance from "../api/axiosInstance"; 

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moodTag, setMoodTag] = useState('neutral');
  const [loading, setLoading] = useState(false);

  // Fetch past entries on component load
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      // Axios natively handles JSON parsing. Data is directly assigned to response.data
      const response = await axiosInstance.get('/journals');
      setEntries(response.data);
    } catch (err) {
      console.error("Error fetching journals:", err.response?.data?.message || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Content-Type application/json header is completely implicit with Axios
      const response = await axiosInstance.post('/journals', { 
        title, 
        content, 
        moodTag 
      });
      
      // Update local array with the returned object directly
      setEntries([response.data, ...entries]); 
      setTitle('');
      setContent('');
      setMoodTag('neutral');
    } catch (err) {
      console.error("Error creating entry:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper object to render mood emojis cleanly
  const moodMap = { happy: '😊', anxious: '😫', sad: '😔', neutral: '😐' };

  // return (
  //   <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
  //     <h2>My Private Reflection Journal</h2>
  //     <p style={{ color: '#666' }}>Pour out your thoughts. Your entries are completely private, and our AI assistant will help you reflect.</p>
      
  //     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        
  //       {/* LEFT COLUMN: JOURNAL CREATION FORM */}
  //       <section style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
  //         <h3>Write a New Entry</h3>
  //         <form onSubmit={handleSubmit}>
  //           <div style={{ marginBottom: '15px' }}>
  //             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
  //             <input 
  //               type="text" 
  //               value={title} 
  //               onChange={(e) => setTitle(e.target.value)} 
  //               placeholder="How would you summarize today?"
  //               style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
  //               required 
  //             />
  //           </div>

  //           <div style={{ marginBottom: '15px' }}>
  //             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Your Mood Context</label>
  //             <div style={{ display: 'flex', gap: '10px' }}>
  //               {Object.keys(moodMap).map((mood) => (
  //                 <button
  //                   key={mood}
  //                   type="button"
  //                   onClick={() => setMoodTag(mood)}
  //                   style={{
  //                     padding: '8px 12px',
  //                     cursor: 'pointer',
  //                     borderRadius: '20px',
  //                     border: moodTag === mood ? '2px solid #4A90E2' : '1px solid #ccc',
  //                     background: moodTag === mood ? '#EBF4FE' : '#fff'
  //                   }}
  //                 >
  //                   {moodMap[mood]} {mood.charAt(0).toUpperCase() + mood.slice(1)}
  //                 </button>
  //               ))}
  //             </div>
  //           </div>

  //           <div style={{ marginBottom: '15px' }}>
  //             <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Journal Body</label>
  //             <textarea 
  //               value={content} 
  //               onChange={(e) => setContent(e.target.value)} 
  //               placeholder="Start typing your heart out..." 
  //               rows="6"
  //               style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
  //               required
  //             />
  //           </div>

  //           <button 
  //             type="submit" 
  //             disabled={loading}
  //             style={{ width: '100%', background: '#4A90E2', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
  //           >
  //             {loading ? 'Processing Reflections...' : 'Save Entry Securely'}
  //           </button>
  //         </form>
  //       </section>

  //       {/* RIGHT COLUMN: REVERSE CHRONOLOGICAL JOURNAL ENTRIES */}
  //       <section>
  //         <h3>Past Reflections ({entries.length})</h3>
  //         <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
  //           {entries.length === 0 ? (
  //             <p style={{ fontStyle: 'italic', color: '#999' }}>Your saved entries will appear here.</p>
  //           ) : (
  //             entries.map((entry) => (
  //               <div key={entry._key || entry._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', marginBottom: '15px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
  //                 <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center' }}>
  //                   <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{entry.title}</h4>
  //                   <span title={`Mood: ${entry.moodTag}`}>{moodMap[entry.moodTag] || '😐'}</span>
  //                 </div>
  //                 <small style={{ color: '#aaa', display: 'block', marginBottom: '10px' }}>
  //                   {new Date(entry.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
  //                 </small>
  //                 <p style={{ margin: '0 0 15px 0', color: '#555', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.5' }}>
  //                   {entry.content}
  //                 </p>
                  
  //                 {/* AI Response Display Box */}
  //                 {entry.aiPrompt && (
  //                   <div style={{ background: '#F0F4F8', borderLeft: '4px solid #4A90E2', padding: '10px 12px', borderRadius: '0 4px 4px 0' }}>
  //                     <small style={{ fontWeight: 'bold', color: '#4A90E2', display: 'block', marginBottom: '2px' }}>🤖 AI Reflection Prompt:</small>
  //                     <span style={{ fontSize: '13px', color: '#334E68', fontStyle: 'italic' }}>{entry.aiPrompt}</span>
  //                   </div>
  //                 )}
  //               </div>
  //             ))
  //           )}
  //         </div>
  //       </section>

  //     </div>
  //   </div>
  // );


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          My Reflection Journal
        </h1>
  
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          A private space to reflect, heal, and understand yourself better.
        </p>
      </div>
  
      <div className="grid lg:grid-cols-3 gap-8">
  
        {/* LEFT SIDE */}
        <div className="lg:col-span-1">
  
          {/* <div className="
            bg-white dark:bg-slate-900
            rounded-3xl
            shadow-lg
            border border-slate-200 dark:border-slate-800
            p-6
          ">
   */}
   <div className="
  bg-gradient-to-br
  from-indigo-50
  via-purple-50
  to-cyan-50
  dark:from-indigo-950/40
  dark:via-purple-950/30
  dark:to-cyan-950/20
  rounded-3xl
  shadow-lg
  border border-indigo-100 dark:border-indigo-900/30
  p-6
">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                Write Today's Reflection
              </h2>
  
              <p className="text-sm text-slate-500 mt-1">
                Express your thoughts freely.
              </p>
            </div>
  
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
  
              {/* TITLE */}
              <div>
                <label className="block mb-2 font-medium">
                  Title
                </label>
  
                <input
                  type="text"
                  value={title}
                  onChange={(e)=>
                    setTitle(e.target.value)
                  }
                  placeholder="How was today?"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    dark:border-slate-700
                    bg-white
                    dark:bg-slate-800
                    px-4 py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>
  
              {/* MOODS */}
              <div>
                <label className="block mb-3 font-medium">
                  Mood
                </label>
  
                <div className="grid grid-cols-2 gap-3">
  
                  {[
                    ["happy","😊"],
                    ["neutral","😐"],
                    ["sad","😔"],
                    ["anxious","😫"],
                  ].map(([mood,emoji])=>(
                    <button
                      key={mood}
                      type="button"
                      onClick={()=>
                        setMoodTag(mood)
                      }
                      className={`
                        rounded-2xl
                        p-4
                        border
                        transition
                        ${
                          moodTag===mood
                          ?
                          "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg"
                          :
                          "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        }
                      `}
                    >
                      <div className="text-2xl">
                        {emoji}
                      </div>
  
                      <div className="capitalize mt-2">
                        {mood}
                      </div>
                    </button>
                  ))}
  
                </div>
              </div>
  
              {/* JOURNAL */}
              <div>
                <label className="block mb-2 font-medium">
                  Reflection
                </label>
  
                <textarea
                  rows={8}
                  value={content}
                  onChange={(e)=>
                    setContent(e.target.value)
                  }
                  placeholder="Write whatever is on your mind..."
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
              </div>
  
              {/* BUTTON */}
              <button
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  py-4
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
                {loading
                  ? "Saving..."
                  : "Save Reflection"}
              </button>
  
            </form>
          </div>
        </div>
  
        {/* RIGHT SIDE */}
        <div className="lg:col-span-2">
  
          <div className="
            bg-white dark:bg-slate-900
            rounded-3xl
            shadow-lg
            border border-slate-200 dark:border-slate-800
            p-6
          ">
  
            <div className="
              flex
              justify-between
              items-center
              mb-6
            ">
              <h2 className="text-xl font-semibold">
                Previous Reflections
              </h2>
  
              <div className="
                px-4 py-2
                rounded-full
                bg-blue-100
                text-blue-700
              ">
                {entries.length} entries
              </div>
            </div>
  
            <div className="space-y-5 max-h-[700px] overflow-y-auto">
  
              {entries.length===0 && (
                <div className="
                  text-center
                  py-16
                  text-slate-500
                ">
                  <div className="text-5xl mb-3">
                    📔
                  </div>
  
                  No journal entries yet.
                </div>
              )}
  
              {entries.map((entry)=>(
                <div
                  key={entry._id}
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    dark:border-slate-700
                    p-5
                    hover:shadow-md
                    transition
                  "
                >
  
                  {/* HEADER */}
                  <div className="
                    flex
                    justify-between
                    items-start
                  ">
                    <div>
                      <h3 className="
                        text-lg
                        font-semibold
                      ">
                        {entry.title}
                      </h3>
  
                      <p className="
                        text-sm
                        text-slate-500
                        mt-1
                      ">
                        {new Date(
                          entry.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
  
                    <div className="
                      text-3xl
                    ">
                      {
                        {
                          happy:"😊",
                          anxious:"😫",
                          sad:"😔",
                          neutral:"😐"
                        }[
                          entry.moodTag
                        ]
                      }
                    </div>
                  </div>
  
                  {/* BODY */}
                  <div className="
                    mt-5
                    text-slate-600
                    dark:text-slate-300
                    leading-7
                    whitespace-pre-wrap
                  ">
                    {entry.content}
                  </div>
  
                  {/* AI */}
                  {entry.aiPrompt && (
                    <div className="
                      mt-5
                      rounded-xl
                      p-4
                      bg-gradient-to-r
                      from-blue-50
                      to-purple-50
                      dark:from-slate-800
                      dark:to-slate-700
                      border-l-4
                      border-blue-500
                    ">
                      <div className="
                        font-semibold
                        text-blue-600
                        mb-2
                      ">
                        🤖 AI Reflection
                      </div>
  
                      <div className="
                        italic
                        text-slate-700
                        dark:text-slate-300
                      ">
                        {entry.aiPrompt}
                      </div>
                    </div>
                  )}
  
                </div>
              ))}
  
            </div>
          </div>
        </div>
  
      </div>
    </div>
  );
}
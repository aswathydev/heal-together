// import React, { useState, useEffect } from 'react';

// export default function JournalPage() {
//   const [entries, setEntries] = useState([]);
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [moodTag, setMoodTag] = useState('neutral');
//   const [loading, setLoading] = useState(false);

//   // Mock API Base URL (adjust to match your backend port, e.g., http://localhost:5000)
//   const API_URL = '/api/journals'; 

//   // Fetch past entries on component load
//   useEffect(() => {
//     fetchEntries();
//   }, []);

//   const fetchEntries = async () => {
//     try {
//       // Pass your JWT auth token headers here based on your auth state
//       const res = await fetch(API_URL, {
//         headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
//       });
//       const data = await res.json();
//       if (res.ok) setEntries(data);
//     } catch (err) {
//       console.error("Error fetching journals:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify({ title, content, moodTag })
//       });

//       const newEntry = await res.json();
      
//       if (res.ok) {
//         setEntries([newEntry, ...entries]); // Prepend new entry locally
//         setTitle('');
//         setContent('');
//         setMoodTag('neutral');
//       }
//     } catch (err) {
//       console.error("Error creating entry:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper object to render mood emojis cleanly
//   const moodMap = { happy: '😊', anxious: '😫', sad: '😔', neutral: '😐' };

//   return (
//     <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
//       <h2>My Private Reflection Journal</h2>
//       <p style={{ color: '#666' }}>Pour out your thoughts. Your entries are completely private, and our AI assistant will help you reflect.</p>
      
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        
//         {/* LEFT COLUMN: JOURNAL CREATION FORM */}
//         <section style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
//           <h3>Write a New Entry</h3>
//           <form onSubmit={handleSubmit}>
//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
//               <input 
//                 type="text" 
//                 value={title} 
//                 onChange={(e) => setTitle(e.target.value)} 
//                 placeholder="How would you summarize today?"
//                 style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
//                 required 
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Your Mood Context</label>
//               <div style={{ display: 'flex', gap: '10px' }}>
//                 {Object.keys(moodMap).map((mood) => (
//                   <button
//                     key={mood}
//                     type="button"
//                     onClick={() => setMoodTag(mood)}
//                     style={{
//                       padding: '8px 12px',
//                       cursor: 'pointer',
//                       borderRadius: '20px',
//                       border: moodTag === mood ? '2px solid #4A90E2' : '1px solid #ccc',
//                       background: moodTag === mood ? '#EBF4FE' : '#fff'
//                     }}
//                   >
//                     {moodMap[mood]} {mood.charAt(0).toUpperCase() + mood.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Journal Body</label>
//               <textarea 
//                 value={content} 
//                 onChange={(e) => setContent(e.target.value)} 
//                 placeholder="Start typing your heart out..." 
//                 rows="6"
//                 style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
//                 required
//               />
//             </div>

//             <button 
//               type="submit" 
//               disabled={loading}
//               style={{ width: '100%', background: '#4A90E2', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
//             >
//               {loading ? 'Processing Reflections...' : 'Save Entry Securely'}
//             </button>
//           </form>
//         </section>

//         {/* RIGHT COLUMN: REVERSE CHRONOLOGICAL JOURNAL ENTRIES */}
//         <section>
//           <h3>Past Reflections ({entries.length})</h3>
//           <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
//             {entries.length === 0 ? (
//               <p style={{ fontStyle: 'italic', color: '#999' }}>Your saved entries will appear here.</p>
//             ) : (
//               entries.map((entry) => (
//                 <div key={entry._key || entry._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', marginBottom: '15px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{entry.title}</h4>
//                     <span title={`Mood: ${entry.moodTag}`}>{moodMap[entry.moodTag] || '😐'}</span>
//                   </div>
//                   <small style={{ color: '#aaa', display: 'block', marginBottom: '10px' }}>
//                     {new Date(entry.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
//                   </small>
//                   <p style={{ margin: '0 0 15px 0', color: '#555', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.5' }}>
//                     {entry.content}
//                   </p>
                  
//                   {/* AI Response Display Box */}
//                   {entry.aiPrompt && (
//                     <div style={{ background: '#F0F4F8', borderLeft: '4px solid #4A90E2', padding: '10px 12px', borderRadius: '0 4px 4px 0' }}>
//                       <small style={{ fontWeight: 'bold', color: '#4A90E2', display: 'block', marginBottom: '2px' }}>🤖 AI Reflection Prompt:</small>
//                       <span style={{ fontSize: '13px', color: '#334E68', fontStyle: 'italic' }}>{entry.aiPrompt}</span>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         </section>

//       </div>
//     </div>
//   );
// }




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

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>My Private Reflection Journal</h2>
      <p style={{ color: '#666' }}>Pour out your thoughts. Your entries are completely private, and our AI assistant will help you reflect.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>
        
        {/* LEFT COLUMN: JOURNAL CREATION FORM */}
        <section style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3>Write a New Entry</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="How would you summarize today?"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
                required 
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Your Mood Context</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                {Object.keys(moodMap).map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setMoodTag(mood)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderRadius: '20px',
                      border: moodTag === mood ? '2px solid #4A90E2' : '1px solid #ccc',
                      background: moodTag === mood ? '#EBF4FE' : '#fff'
                    }}
                  >
                    {moodMap[mood]} {mood.charAt(0).toUpperCase() + mood.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Journal Body</label>
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Start typing your heart out..." 
                rows="6"
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ width: '100%', background: '#4A90E2', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {loading ? 'Processing Reflections...' : 'Save Entry Securely'}
            </button>
          </form>
        </section>

        {/* RIGHT COLUMN: REVERSE CHRONOLOGICAL JOURNAL ENTRIES */}
        <section>
          <h3>Past Reflections ({entries.length})</h3>
          <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '5px' }}>
            {entries.length === 0 ? (
              <p style={{ fontStyle: 'italic', color: '#999' }}>Your saved entries will appear here.</p>
            ) : (
              entries.map((entry) => (
                <div key={entry._key || entry._id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '6px', marginBottom: '15px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{entry.title}</h4>
                    <span title={`Mood: ${entry.moodTag}`}>{moodMap[entry.moodTag] || '😐'}</span>
                  </div>
                  <small style={{ color: '#aaa', display: 'block', marginBottom: '10px' }}>
                    {new Date(entry.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </small>
                  <p style={{ margin: '0 0 15px 0', color: '#555', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.5' }}>
                    {entry.content}
                  </p>
                  
                  {/* AI Response Display Box */}
                  {entry.aiPrompt && (
                    <div style={{ background: '#F0F4F8', borderLeft: '4px solid #4A90E2', padding: '10px 12px', borderRadius: '0 4px 4px 0' }}>
                      <small style={{ fontWeight: 'bold', color: '#4A90E2', display: 'block', marginBottom: '2px' }}>🤖 AI Reflection Prompt:</small>
                      <span style={{ fontSize: '13px', color: '#334E68', fontStyle: 'italic' }}>{entry.aiPrompt}</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaComments } from "react-icons/fa";

// export default function FloatingChatButton() {
//   const navigate = useNavigate();
//   const [visible, setVisible] = useState(false);
//   const [messages, setMessages] = useState([
//     { sender: "ai", text: "Hi 👋 I'm here to support you." }
//   ]);
//   const [input, setInput] = useState("");

//   const sendMessage = () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages(prev => [...prev, userMsg]);

//     // Fake AI response (replace with API)
//     setTimeout(() => {
//       const aiMsg = {
//         sender: "ai",
//         text: "I understand. Want to try a quick breathing exercise?"
//       };
//       setMessages(prev => [...prev, aiMsg]);
//     }, 800);

//     setInput("");
//   };
//   return (
//     <>
//       <button
//         onClick={() => setVisible(true)}
//         // onClick={() => navigate("/")}
//         // className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
//         className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg animate-pulse"
//       >
//         <FaComments size={20} />
//       </button>

//       {/* Chat Popup */}
//       {visible && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "0",
//             right: "20px",
//             width: "350px",
//             height: "500px",
//             backgroundColor: "#fff",
//             borderRadius: "15px 15px 0 0",
//             boxShadow: "0 0 15px rgba(0,0,0,0.3)",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden"
//           }}
//         >
//           {/* Header */}
//           <div
//             style={{
//               padding: "10px",
//               backgroundColor: "#4CAF50",
//               color: "#fff",
//               display: "flex",
//               justifyContent: "space-between"
//             }}
//           >
//             <span>Talk to Aira</span>
//             <button
//               onClick={() => setVisible(false)}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#fff",
//                 cursor: "pointer"
//               }}
//             >
//               ✖
//             </button>
//           </div>

//           {/* Messages */}
//           <div
//             style={{
//               flex: 1,
//               padding: "10px",
//               overflowY: "auto",
//               background: "#f5f5f5"
//             }}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 style={{
//                   textAlign: msg.sender === "user" ? "right" : "left",
//                   marginBottom: "8px"
//                 }}
//               >
//                 <span
//                   style={{
//                     display: "inline-block",
//                     padding: "8px 12px",
//                     borderRadius: "12px",
//                     background:
//                       msg.sender === "user" ? "#4CAF50" : "#ddd",
//                     color: msg.sender === "user" ? "#fff" : "#000"
//                   }}
//                 >
//                   {msg.text}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <div
//             style={{
//               display: "flex",
//               padding: "10px",
//               borderTop: "1px solid #ddd"
//             }}
//           >
//             <input
//               type="text"
//               value={input}
//               onChange={e => setInput(e.target.value)}
//               placeholder="Type your message..."
//               style={{
//                 flex: 1,
//                 padding: "8px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//                 color: 'green'
//               }}
//             />
//             <button
//               onClick={sendMessage}
//               style={{
//                 marginLeft: "8px",
//                 padding: "8px 12px",
//                 backgroundColor: "#4CAF50",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "8px",
//                 cursor: "pointer"
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}


//     </>
//   );
// }





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";

export default function FloatingChatButton() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I'm here to support you." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Track AI thinking state

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    const textToSend = input;
    setInput("");
    setLoading(true);

    try {
      // 1. Retrieve your auth token (adjust key name if needed based on your login flow)
      const token = localStorage.getItem("token");

      // 2. Make the HTTP request to your backend route
      const response = await axiosInstance.post(
        "/chat", // Update port/URL if your backend differs
        { message: textToSend },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      // 3. Append the real AI response to the message history
      if (response.data && response.data.reply) {
        setMessages(prev => [...prev, { sender: "ai", text: response.data.reply }]);
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "Sorry, I'm having trouble connecting right now. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg animate-pulse"
      >
        <FaComments size={20} />
      </button>


      {/* Chat Popup */}
      {visible && (
        <div className="fixed bottom-0 right-5 w-[350px] h-[500px] bg-white rounded-t-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50">

          {/* Header */}
          <div className="bg-green-500 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white text-green-500 flex items-center justify-center font-bold">
                A
              </div>
              <span className="font-semibold">Talk to Aira</span>
            </div>

            <button
              onClick={() => setVisible(false)}
              className="hover:bg-green-600 p-1 rounded transition"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === "user"
                      ? "bg-green-500 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border px-4 py-2 rounded-2xl rounded-bl-sm text-sm text-gray-500 italic shadow-sm">
                  Aira is reflecting...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t bg-white p-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                loading ? "Waiting for response..." : "Type your message..."
              }
              disabled={loading}
              className={`flex-1 px-4 py-2 rounded-xl border outline-none
                bg-white text-black
                dark:bg-slate-800 dark:text-white
                placeholder:text-gray-500 dark:placeholder:text-gray-400
                transition ${
                  loading
                    ? "bg-gray-100 dark:bg-slate-700 cursor-not-allowed"
                    : "focus:ring-2 focus:ring-green-400"
                }`}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className={`px-4 py-2 rounded-xl font-medium text-white transition ${loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
                }`}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chat Popup */}
      {/* {visible && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            right: "20px",
            width: "350px",
            height: "500px",
            backgroundColor: "#fff",
            borderRadius: "15px 15px 0 0",
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>Talk to Aira</span>
            <button
              onClick={() => setVisible(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer"
              }}
            >
              ✖
            </button>
          </div>

          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              background: "#f5f5f5"
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  marginBottom: "8px"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    background: msg.sender === "user" ? "#4CAF50" : "#ddd",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    maxWidth: "80%",
                    wordBreak: "break-word"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {loading && (
              <div style={{ textAlign: "left", marginBottom: "8px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "8px 12px",
                    borderRadius: "12px",
                    background: "#ddd",
                    color: "#666",
                    fontStyle: "italic",
                    fontSize: "14px"
                  }}
                >
                  Aira is reflecting...
                </span>
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #ddd"
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()} // Allow pressing Enter to send
              placeholder={loading ? "Waiting for response..." : "Type your message..."}
              disabled={loading}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: loading ? "#f0f0f0" : "#fff",
                color: "green"
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                marginLeft: "8px",
                padding: "8px 12px",
                backgroundColor: loading ? "#9cca9c" : "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}
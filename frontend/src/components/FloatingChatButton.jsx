import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";

export default function FloatingChatButton() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi 👋 I'm here to support you." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    // Fake AI response (replace with API)
    setTimeout(() => {
      const aiMsg = {
        sender: "ai",
        text: "I understand. Want to try a quick breathing exercise?"
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);

    setInput("");
  };
  return (
    <>
      <button
        onClick={() => setVisible(true)}
        // onClick={() => navigate("/")}
        // className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white p-4 rounded-full shadow-lg animate-pulse"
      >
        <FaComments size={20} />
      </button>

      {/* Chat Popup */}
      {visible && (
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
          {/* Header */}
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

          {/* Messages */}
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
                    background:
                      msg.sender === "user" ? "#4CAF50" : "#ddd",
                    color: msg.sender === "user" ? "#fff" : "#000"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
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
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                color: 'green'
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: "8px",
                padding: "8px 12px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}


    </>
  );
}
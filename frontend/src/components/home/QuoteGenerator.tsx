import { useState } from "react";
import { generateQuote } from "../../services/quoteService";
import React from "react";

export default function QuoteGenerator() {
  const [prompt, setPrompt] = useState("");
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const response = await generateQuote(prompt);

      console.log(response.data);

      setQuote(response.data.data.quote);
      setPrompt("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to generate quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <input
        type="text"
        placeholder="Enter a topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full border p-3 rounded-lg"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg"
      >
        {loading ? "Generating..." : "Generate Quote"}
      </button>

      {quote && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="italic text-lg">{quote}</p>
        </div>
      )}
    </div>
  );
}
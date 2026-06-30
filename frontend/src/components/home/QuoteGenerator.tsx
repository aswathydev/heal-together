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

      console.log('GENERATED QUOTE 11:11', response.data);

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
    // <div className="max-w-lg mx-auto p-6">
    //   <input
    //     type="text"
    //     placeholder="Enter a topic..."
    //     value={prompt}
    //     onChange={(e) => setPrompt(e.target.value)}
    //     className="w-full border p-3 rounded-lg"
    //   />

    //   <button
    //     onClick={handleGenerate}
    //     disabled={loading}
    //     className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg"
    //   >
    //     {loading ? "Generating..." : "Generate Quote"}
    //   </button>

    //   {quote && (
    //     <div className="mt-6 p-4 bg-gray-100 rounded-lg">
    //       <p className="italic text-lg">{quote}</p>
    //     </div>
    //   )}
    // </div>
    <div className="max-w-3xl mx-auto px-4 py-10">

  {/* Header */}
  <div className="text-center mb-8">
    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
      Daily Inspiration
    </h1>

    <p className="mt-3 text-slate-600 dark:text-slate-400">
      Generate uplifting quotes for your healing journey.
    </p>
  </div>

  {/* Generator Card */}
  <div className="
    bg-gradient-to-br
    from-blue-50
    via-white
    to-purple-50
    dark:from-slate-900
    dark:via-slate-800
    dark:to-purple-950/30
    rounded-3xl
    shadow-xl
    border
    border-slate-200
    dark:border-slate-800
    p-8
  ">

    <div className="space-y-6">

      {/* Input */}
      <div>
        <label className="block mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          What would you like inspiration about?
        </label>

        <input
          type="text"
          placeholder="Examples: Hope, Anxiety, Growth, Healing..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            px-5
            py-4
            text-slate-700
            dark:text-white
            placeholder:text-slate-400
            outline-none
            focus:ring-2
            focus:ring-purple-500
            transition
          "
        />
      </div>

      {/* Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="
          w-full
          py-4
          rounded-2xl
          font-semibold
          text-white
          bg-gradient-to-r
          from-blue-500
          to-purple-600
          hover:scale-[1.02]
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
          shadow-lg
        "
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>

            Generating Inspiration...
          </span>
        ) : (
          "✨ Generate Quote"
        )}
      </button>
    </div>

    {/* Result */}
    {quote && (
      <div className="
        mt-8
        rounded-3xl
        bg-white/70
        dark:bg-slate-800
        backdrop-blur-sm
        border
        border-blue-100
        dark:border-slate-700
        p-8
        shadow-sm
      ">
        <div className="text-center">

          <div className="text-4xl mb-4">
            💙
          </div>

          <blockquote className="
            text-xl
            md:text-2xl
            italic
            leading-relaxed
            text-slate-700
            dark:text-slate-200
          ">
            {quote}
          </blockquote>

          <div className="
            mt-6
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-purple-100
            dark:bg-purple-900
            text-purple-700
            dark:text-purple-300
            text-sm
            font-medium
          ">
            ✨ AI Generated Inspiration
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  );
}
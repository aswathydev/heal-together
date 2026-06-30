export default function MoodPrompt({  handleAddMood,
}) {
  const moods = [
    { emoji: "😊", label: "Good", value: "great" },
    { emoji: "😐", label: "Okay", value: "okay" },
    { emoji: "😔", label: "Sad", value: "low" },
    { emoji: "😡", label: "Angry", value: "bad" },
    { emoji: "😴", label: "Tired", value: "rough" },
  ];

  
  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-100 p-8">

        {/* Greeting */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
            Hi there 👋
          </h2>

          <p className="mt-3 text-lg md:text-xl text-slate-600">
            How are you feeling today?
          </p>
        </div>

        {/* Mood Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {moods.map((mood, index) => (
            <button
              key={index}
              className="
                group
                bg-white
                rounded-2xl
                p-5
                shadow-md
                border border-slate-100
                hover:shadow-xl
                hover:-translate-y-2
                hover:border-cyan-300
                transition-all
                duration-300
              "
              onClick={() => handleAddMood(mood.value)}

            >
              <div className="text-4xl group-hover:scale-125 transition-transform duration-300">
                {mood.emoji}
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-700">
                {mood.label}
              </p>
            </button>
          ))}
        </div>

        {/* Optional Quote */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400 italic">
            "Every feeling is valid. Take a moment to check in with yourself."
          </p>
        </div>

      </div>
    </div>
  );
}
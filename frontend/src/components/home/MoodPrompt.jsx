export default function MoodPrompt() {
    const moods = [
      { emoji: "🙂", label: "Good" },
      { emoji: "😐", label: "Okay" },
      { emoji: "😔", label: "Sad" },
      { emoji: "😡", label: "Angry" },
      { emoji: "😴", label: "Tired" },
    ];
  
    return (
      <div className="w-full  py-0 px-4 text-center">
        
        {/* Greeting */}
        <h2 className="text-2xl md:text-3xl font-medium text-purple-300">
          Hi there 👋
        </h2>
  
        {/* Question */}
        <p className="mt-2 text-lg md:text-xl text-green-600">
          How are you feeling today?
        </p>
  
        {/* Emoji Row */}
        <div className="mt-6 flex justify-center gap-4">
          {moods.map((mood, index) => (
            <button
              key={index}
              className="text-2xl md:text-3xl hover:scale-125 transition-transform duration-200"
              title={mood.label}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      </div>
    );
  }
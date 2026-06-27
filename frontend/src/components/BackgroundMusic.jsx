// import { useEffect, useRef, useState } from 'react';

// export default function BackgroundMusic() {
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // 1. Handle auto-playing on the very first user interaction
//   useEffect(() => {
//     const handleFirstInteraction = () => {
//       if (audioRef.current && !isPlaying) {
//         audioRef.current.play()
//           .then(() => {
//             setIsPlaying(true);
//             // Remove listeners once successfully playing
//             removeInteractionListeners();
//           })
//           .catch(err => console.log("Autoplay blocked by browser:", err));
//       }
//     };

//     const removeInteractionListeners = () => {
//       window.removeEventListener('click', handleFirstInteraction);
//       window.removeEventListener('keydown', handleFirstInteraction);
//     };

//     // Listen for any initial click or keypress to boot up audio safely
//     window.addEventListener('click', handleFirstInteraction);
//     window.addEventListener('keydown', handleFirstInteraction);

//     return () => removeInteractionListeners();
//   }, [isPlaying]);

//   // 2. Manual play/pause toggle toggle
//   const toggleMusic = () => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       audioRef.current.play()
//         .then(() => setIsPlaying(true))
//         .catch(err => console.error("Playback failed:", err));
//     }
//   };

//   return (
//     <div className="fixed bottom-6 left-6 z-50">
//       {/* Hidden audio element set to loop infinitely */}
//       <audio 
//         ref={audioRef} 
//         src="/river.mp3" 
//         loop 
//         preload="auto"
//       />
      
//       {/* Minimalist Tailwind Floating Control Button */}
//       <button
//         onClick={toggleMusic}
//         className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 dark:bg-slate-800/80 text-lg shadow-md backdrop-blur-sm transition-all hover:scale-110 border border-slate-200/50 dark:border-slate-700/50"
//         title={isPlaying ? "Mute Music" : "Play Music"}
//       >
//         {isPlaying ? '🎵' : '🔇'}
//       </button>
//     </div>
//   );
// }



import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // sync state with audio
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  // autoplay after first interaction
  useEffect(() => {
    const handleFirstInteraction = async () => {
      const audio = audioRef.current;

      if (!audio || !audio.paused) return;

      try {
        await audio.play();
        removeListeners();
      } catch (err) {
        console.log("Autoplay blocked:", err);
      }
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);

    return removeListeners;
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio
        ref={audioRef}
        src="/music-of-sky.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={toggleMusic}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md"
      >
        {isPlaying ? "🎵" : "🔇"}
      </button>
    </div>
  );
}

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
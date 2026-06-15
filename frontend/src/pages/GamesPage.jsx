import { useMemo, useState } from 'react'

const EMOJI = ['🌿', '☀️', '🌙', '💧', '🍃', '✨']

function shuffle(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState(null)

  const games = [
    { id: 'memory', title: 'Memory Match 🧠', desc: 'Match pairs and train memory' },
    { id: 'reaction', title: 'Reaction Time ⚡', desc: 'Test your reflex speed' },
    { id: 'numbers', title: 'Number Tap 🔢', desc: 'Tap numbers in order' },
    { id: 'breathing', title: 'Breathing Calm 🌿', desc: 'Relax with breathing rhythm' },
    { id: 'pattern', title: 'Pattern Recall', desc: 'Memorize and repeat patterns'},
    { id: 'calm', title: 'Calm Dot', desc: 'Tap the moving dot' },
    { id: 'stroop', title: 'Color Match', desc: 'Match the correct color'},
    { id: 'gratitude', title: 'Gratitude Tap', desc: 'Tap positive words' },
  ]

  if (selectedGame) {
    return (
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <button
          onClick={() => setSelectedGame(null)}
          className="text-sm text-teal-600 underline"
        >
          ← Back to games
        </button>

        {selectedGame === 'memory' && <MemoryGame />}
        {selectedGame === 'reaction' && <ReactionGame />}
        {selectedGame === 'numbers' && <NumberTapGame />}
        {selectedGame === 'breathing' && <BreathingGame />}
        {selectedGame === 'pattern' && <PatternRecallGame />}
        {selectedGame === 'calm' && <CalmDotGame />}
        {selectedGame === 'stroop' && <StroopGame />}
        {selectedGame === 'gratitude' && <GratitudeGame />}
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-center">
      <h1 className="text-3xl font-semibold text-slate-500">Choose a Game 🎮</h1>

      <div className="grid sm:grid-cols-2 gap-4">
        {games.map((g) => (
          <button
            key={g.id}
            onClick={() => setSelectedGame(g.id)}
            className="p-5 rounded-xl border hover:border-teal-400 text-left"
          >
            <h2 className="font-semibold text-lg text-slate-500">{g.title}</h2>
            <p className="text-sm text-slate-500">{g.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- MEMORY GAME ---------------- */

function MemoryGame() {
  const cards = useMemo(() => {
    const pair = EMOJI.slice(0, 4)
    return shuffle(
      pair.flatMap((symbol, i) => [
        { id: `a-${i}`, symbol, pairId: i },
        { id: `b-${i}`, symbol, pairId: i },
      ])
    )
  }, [])

  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState(new Set())

  function onCardClick(id) {
    if (flipped.length >= 2 || flipped.includes(id)) return

    const c = cards.find((x) => x.id === id)
    if (c && matched.has(c.pairId)) return

    if (flipped.length === 0) {
      setFlipped([id])
      return
    }

    const firstId = flipped[0]
    const ca = cards.find((x) => x.id === firstId)
    const cb = cards.find((x) => x.id === id)

    setFlipped([firstId, id])

    if (ca && cb && ca.pairId === cb.pairId) {
      setMatched((s) => new Set(s).add(ca.pairId))
      setFlipped([])
    } else {
      setTimeout(() => setFlipped([]), 600)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-slate-500">Memory Match</h2>

      <div className="grid grid-cols-4 gap-2">
        {cards.map((c) => {
          const isOpen = flipped.includes(c.id) || matched.has(c.pairId)
          return (
            <button
              key={c.id}
              onClick={() => onCardClick(c.id)}
              className={`aspect-square rounded-xl text-xl ${isOpen ? 'bg-teal-200' : 'bg-slate-200'
                }`}
            >
              {isOpen ? c.symbol : '?'}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------- REACTION GAME ---------------- */

function ReactionGame() {
  const [status, setStatus] = useState('idle')
  const [startTime, setStartTime] = useState(0)
  const [reaction, setReaction] = useState(null)

  function startGame() {
    setStatus('waiting')
    const delay = Math.random() * 2000 + 1000
    setTimeout(() => {
      setStatus('ready')
      setStartTime(Date.now())
    }, delay)
  }

  function handleClick() {
    if (status === 'ready') {
      setReaction(Date.now() - startTime)
      setStatus('done')
    } else if (status === 'waiting') {
      alert('Too early!')
      setStatus('idle')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-slate-500">Reaction Time</h2>

      <div
        onClick={handleClick}
        className={`h-32 flex items-center justify-center rounded-lg ${status === 'ready'
          ? 'bg-green-400'
          : status === 'waiting'
            ? 'bg-red-400'
            : 'bg-slate-200'
          }`}
      >
        {status === 'idle' && 'Start'}
        {status === 'waiting' && 'Wait...'}
        {status === 'ready' && 'CLICK!'}
        {status === 'done' && `${reaction} ms`}
      </div>

      <button
        onClick={startGame}
        className="mt-3 px-4 py-2 bg-teal-500 text-white rounded"
      >
        Start
      </button>
    </div>
  )
}

/* ---------------- NUMBER TAP ---------------- */

function NumberTapGame() {
  const numbers = useMemo(
    () => shuffle([...Array(9).keys()].map((n) => n + 1)),
    []
  )
  const [current, setCurrent] = useState(1)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3 text-slate-500">Tap Numbers</h2>
      <p className="text-slate-500">Next: {current}</p>

      <div className="grid grid-cols-3 gap-2 mt-2">
        {numbers.map((n) => (
          <button
            key={n}
            onClick={() => n === current && setCurrent(current + 1)}
            className="aspect-square bg-slate-200 text-slate-500 rounded"
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- BREATHING GAME ---------------- */

function BreathingGame() {
  const [phase, setPhase] = useState('inhale')

  useState(() => {
    const interval = setInterval(() => {
      setPhase((p) =>
        p === 'inhale' ? 'hold' : p === 'hold' ? 'exhale' : 'inhale'
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-4">
      <h2 className="text-xl font-semibold text-slate-500">Breathing Calm</h2>

      <div className="h-40 flex items-center justify-center">
        <div
          className={`rounded-full bg-teal-400 transition-all duration-1000 ${phase === 'inhale'
            ? 'w-32 h-32'
            : phase === 'hold'
              ? 'w-36 h-36'
              : 'w-24 h-24'
            }`}
        />
      </div>

      <p className="text-lg capitalize">{phase}</p>
    </div>
  )
}


function PatternRecallGame() {
  const size = 3
  const total = size * size

  const [pattern, setPattern] = useState([])
  const [user, setUser] = useState([])
  const [show, setShow] = useState(true)

  useState(() => {
    const p = shuffle([...Array(total).keys()]).slice(0, 4)
    setPattern(p)

    setTimeout(() => setShow(false), 1500)
  }, [])

  function handleClick(i) {
    if (show) return

    const newUser = [...user, i]
    setUser(newUser)

    if (newUser.length === pattern.length) {
      const correct = pattern.every((v, idx) => v === newUser[idx])
      alert(correct ? 'Correct 🎉' : 'Try again')
      window.location.reload()
    }
  }

  return (
    <div className="text-center space-y-4">
      <h2 className="font-semibold text-slate-500">Pattern Recall</h2>

      <div className="grid grid-cols-3 gap-2">
        {[...Array(total)].map((_, i) => {
          const active = show
            ? pattern.includes(i)
            : user.includes(i)

          return (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`aspect-square rounded ${active ? 'bg-teal-400' : 'bg-slate-200'
                }`}
            />
          )
        })}
      </div>

      <p className="text-sm">
        {show ? 'Memorize pattern...' : 'Repeat pattern'}
      </p>
    </div>
  )
}




function CalmDotGame() {
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [score, setScore] = useState(0)

  useState(() => {
    const interval = setInterval(() => {
      setPos({
        x: Math.random() * 80,
        y: Math.random() * 80,
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-4">
      <h2 className="font-semibold">Tap the Calm Dot</h2>
      <p>Score: {score}</p>

      <div className="relative h-60 bg-slate-100 rounded-lg overflow-hidden">
        <div
          onClick={() => setScore((s) => s + 1)}
          className="absolute w-10 h-10 bg-teal-400 rounded-full cursor-pointer transition-all duration-700"
          style={{
            top: `${pos.y}%`,
            left: `${pos.x}%`,
          }}
        />
      </div>
    </div>
  )
}






function StroopGame() {
  const COLORS = ['red', 'blue', 'green', 'purple']

  const [word, setWord] = useState('')
  const [color, setColor] = useState('')
  const [score, setScore] = useState(0)

  function next() {
    const w = COLORS[Math.floor(Math.random() * COLORS.length)]
    const c = COLORS[Math.floor(Math.random() * COLORS.length)]
    setWord(w)
    setColor(c)
  }

  useState(() => {
    next()
  }, [])

  function handleAnswer(c) {
    if (c === color) setScore((s) => s + 1)
    next()
  }

  return (
    <div className="text-center space-y-4">
      <h2 className="font-semibold">Color Match</h2>
      <p className="text-sm text-slate-500">Tap the COLOR, not the word</p>

      <h1
        className="text-4xl font-bold"
        style={{ color: color }}
      >
        {word}
      </h1>

      <div className="flex justify-center gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => handleAnswer(c)}
            className="px-3 py-2 rounded text-white"
            style={{ backgroundColor: c }}
          >
            {c}
          </button>
        ))}
      </div>

      <p>Score: {score}</p>
    </div>
  )
}




function GratitudeGame() {
  const WORDS = ['Peace', 'Calm', 'Breathe', 'Relax', 'Smile']

  const [items, setItems] = useState([])

  useState(() => {
    const interval = setInterval(() => {
      const word = WORDS[Math.floor(Math.random() * WORDS.length)]

      setItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          word,
          x: Math.random() * 80,
        },
      ])
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  function remove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="text-center space-y-4">
      <h2 className="font-semibold">Gratitude Tap</h2>

      <div className="relative h-64 bg-slate-100 rounded overflow-hidden">
        {items.map((i) => (
          <div
            key={i.id}
            onClick={() => remove(i.id)}
            className="absolute cursor-pointer bg-teal-200 px-3 py-1 rounded animate-bounce"
            style={{
              bottom: 0,
              left: `${i.x}%`,
            }}
          >
            {i.word}
          </div>
        ))}
      </div>

      <p className="text-sm text-slate-500">
        Tap positive words 🌿
      </p>
    </div>
  )
}
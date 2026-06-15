/** UI-only mock data */

export const helpRequests = [
  {
    id: '1',
    title: 'Need someone to talk to tonight',
    urgency: 'high',
    excerpt: 'Feeling overwhelmed after exams — a kind voice would help.',
    responses: 3,
    time: '2h ago',
  },
  {
    id: '2',
    title: 'Looking for peer support (anxiety)',
    urgency: 'medium',
    excerpt: 'First time posting. Managing panic before work.',
    responses: 7,
    time: '5h ago',
  },
]

export const feedPosts = [
  {
    id: 'p1',
    author: 'Alex M.',
    anonymous: false,
    body: 'Grateful for small wins today — went for a short walk.',
    likes: 24,
    comments: 5,
    time: '1d ago',
  },
  {
    id: 'p2',
    author: 'Anonymous',
    anonymous: true,
    body: 'Reminder: it is okay to rest without earning it.',
    likes: 41,
    comments: 12,
    time: '2d ago',
  },
]

export const quotes = [
  {
    id: 'q1',
    text: 'You do not have to control your thoughts. You just have to stop letting them control you.',
    author: 'Dan Millman',
    mood: 'stressed',
  },
  {
    id: 'q2',
    text: 'Small steps every day build a kind relationship with yourself.',
    author: 'Platform',
    mood: 'sad',
  },
]

export const videos = [
  {
    id: 'v1',
    title: '5-minute breathing reset',
    duration: '5:12',
    focus: 'Calm',
    thumb: 'linear-gradient(135deg, #0d9488 0%, #6366f1 100%)',
  },
  {
    id: 'v2',
    title: 'Gentle neck & shoulder release',
    duration: '8:45',
    focus: 'Tension',
    thumb: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
  },
  {
    id: 'v3',
    title: 'Morning stretch for focus',
    duration: '10:02',
    focus: 'Energy',
    thumb: 'linear-gradient(135deg, #059669 0%, #14b8a6 100%)',
  },
]

export const providers = [
  {
    id: 'pr1',
    name: 'Dr. Samira Patel',
    role: 'Licensed counselor',
    rating: 4.9,
    reviews: 128,
    services: ['CBT', 'Stress', 'Anxiety'],
    bio: 'Telehealth and in-person sessions. Sliding scale available.',
  },
  {
    id: 'pr2',
    name: 'Jordan Lee, LCSW',
    role: 'Clinical social worker',
    rating: 4.8,
    reviews: 94,
    services: ['Group therapy', 'Mindfulness', 'Teens'],
    bio: 'Focus on everyday coping skills and emotional safety.',
  },
]

export const notifications = [
  { id: 'n1', text: 'Daily mood check-in reminder', time: 'Today, 9:00 AM', read: false },
  { id: 'n2', text: 'New reply on your community post', time: 'Yesterday', read: true },
  { id: 'n3', text: 'New quote pack for “calm”', time: 'Mon', read: true },
]

export const helplines = [
  { name: 'National Suicide Prevention Lifeline', phone: '988', region: 'US' },
  { name: 'Crisis Text Line', phone: 'Text HOME to 741741', region: 'US' },
  { name: 'iCall (India)', phone: '9152987821', region: 'IN' },
]

export const moderationQueue = [
  { id: 'm1', type: 'post', preview: 'Contains harsh language toward self', status: 'pending', risk: 'medium' },
  { id: 'm2', type: 'comment', preview: 'Possible spam link', status: 'pending', risk: 'high' },
]

export const journalPrompts = [
  'What is one thing that went better than you expected today?',
  'Name a boundary you are proud of maintaining recently.',
  'What would you tell a friend who felt the way you feel now?',
]



export const posts = [
  {
    id: 1,
    user: 'Anjali',
    mood: 'rough',
    text: 'Had a really tough day, trying to stay positive.',
    time: '2h ago',
  },
  {
    id: 2,
    user: 'Rahul',
    mood: 'great',
    text: 'Feeling amazing after a morning workout!',
    time: '5h ago',
  },
  {
    id: 3,
    user: 'Meera',
    mood: 'low',
    text: 'Not my best day, but taking it slow.',
    time: '1d ago',
  },
  {
    id: 4,
    user: 'Arjun',
    mood: 'okay',
    text: 'Just an average day, trying to stay balanced.',
    time: '3h ago',
  },
  {
    id: 5,
    user: 'Sneha',
    mood: 'great',
    text: 'Grateful for the little things today 💛',
    time: '6h ago',
  },
  {
    id: 6,
    user: 'Vikram',
    mood: 'rough',
    text: 'Feeling overwhelmed, but taking it one step at a time.',
    time: '1d ago',
  }
]
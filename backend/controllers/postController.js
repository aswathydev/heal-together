const Post = require('../models/Post');

// Simple AI simulation logic to check for toxic or harmful language
function scanForHarmfulContent(text) {
  const blacklist = ['hate', 'kill myself', 'worthless person', 'stupid', 'abuse']; 
  const lowercaseText = text.toLowerCase();
  
  for (let keyword of blacklist) {
    if (lowercaseText.includes(keyword)) {
      return { flagged: true, reason: `Contains sensitive or harmful phrase: "${keyword}"` };
    }
  }
  return { flagged: false, reason: '' };
}

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, isAnonymous } = req.body;
    if (!content) return res.status(400).json({ message: "Post content cannot be empty." });

    // AI Check
    const safetyCheck = scanForHarmfulContent(content);

    const newPost = new Post({
      userId: req.user.id,
      content,
      isAnonymous,
      isFlagged: safetyCheck.flagged,
      flagReason: safetyCheck.reason
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: "Error creating post.", error: err.message });
  }
};

// Get clean feed (excludes flagged items for normal users)
exports.getFeed = async (req, res) => {
  try {
    const feed = await Post.find({ isFlagged: false })
      .populate('userId', 'name') // Pulls username from user collection
      .sort({ createdAt: -1 });
    res.json(feed);
  } catch (err) {
    res.status(500).json({ message: "Error fetching community feed." });
  }
};

// Like/Unlike toggler
exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json({ likesCount: post.likes.length, likes: post.likes });
  } catch (err) {
    res.status(500).json({ message: "Error updating interaction." });
  }
};
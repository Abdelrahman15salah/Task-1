const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ClaimHistory = require('../models/ClaimHistory');

router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  const points = Math.floor(Math.random() * 10) + 1;
//  console.log(points);


  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new ClaimHistory({ userId, points });
  await history.save();

  // Emit real-time update
  req.io.emit('leaderboardUpdate');

  res.json({ user, points });
});

// GET all claim history
router.get('/', async (req, res) => {
  try {
    const history = await ClaimHistory.find().populate('userId', 'name').sort({ claimedAt: -1 });
    // Format for frontend: include userName
    const formatted = history.map(h => ({
      userName: h.userId?.name || 'Unknown',
      points: h.points,
      date: h.claimedAt
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching claim history' });
  }
});

module.exports = router;
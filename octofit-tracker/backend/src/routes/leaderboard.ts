import { Router, Request, Response } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

// GET leaderboard
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('userId', 'name email')
      .populate('teamId', 'name');
    res.json({
      message: 'Get leaderboard',
      count: leaderboard.length,
      leaderboard
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET leaderboard by team
router.get('/team/:teamId', async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;
    const leaderboard = await Leaderboard.find({ teamId })
      .sort({ rank: 1 })
      .populate('userId', 'name email')
      .populate('teamId', 'name');
    res.json({
      message: `Get leaderboard for team ${teamId}`,
      teamId,
      count: leaderboard.length,
      leaderboard
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET user rank
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const entry = await Leaderboard.findOne({ userId })
      .populate('userId', 'name email')
      .populate('teamId', 'name');
    if (!entry) {
      return res.status(404).json({ error: 'User not found in leaderboard' });
    }
    res.json({
      message: `Get rank for user ${userId}`,
      user: entry
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

import { Router, Request, Response } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

// GET all activities
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find().populate('userId', 'name email').populate('teamId', 'name');
    res.json({
      message: 'Get all activities',
      count: activities.length,
      activities
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET activity by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id).populate('userId', 'name email').populate('teamId', 'name');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Get activity ${id}`,
      activity
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, distance, calories, teamId, description } = req.body;
    const activity = new Activity({ userId, type, duration, distance, calories, teamId, description });
    await activity.save();
    const populatedActivity = await Activity.findById(activity._id).populate('userId', 'name email').populate('teamId', 'name');
    res.status(201).json({
      message: 'Activity created',
      activity: populatedActivity
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update activity
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, duration, distance, calories, description } = req.body;
    await Activity.findByIdAndUpdate(
      id,
      { type, duration, distance, calories, description },
      { new: true }
    );
    const activity = await Activity.findById(id).populate('userId', 'name email').populate('teamId', 'name');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity ${id} updated`,
      activity
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE activity
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({
      message: `Activity ${id} deleted`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

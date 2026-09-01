import { Router, Request, Response } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

// GET all workouts
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find();
    res.json({
      message: 'Get all workouts',
      count: workouts.length,
      workouts
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET workout by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Get workout ${id}`,
      workout
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET recommended workouts (beginner friendly)
router.get('/recommendations/:difficulty', async (req: Request, res: Response) => {
  try {
    const { difficulty } = req.params;
    const recommendations = await Workout.find({ difficulty });
    res.json({
      message: `Get workout recommendations for difficulty ${difficulty}`,
      difficulty,
      count: recommendations.length,
      recommendations
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, duration, difficulty, type, instructions, caloriesBurned } = req.body;
    const workout = new Workout({
      name,
      description,
      duration,
      difficulty,
      type,
      instructions,
      caloriesBurned
    });
    await workout.save();
    res.status(201).json({
      message: 'Workout created',
      workout
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update workout
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, duration, difficulty, type, instructions, caloriesBurned } = req.body;
    const workout = await Workout.findByIdAndUpdate(
      id,
      { name, description, duration, difficulty, type, instructions, caloriesBurned },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Workout ${id} updated`,
      workout
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE workout
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({
      message: `Workout ${id} deleted`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

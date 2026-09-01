import { Router, Request, Response } from 'express';
import User from '../models/User.js';

const router = Router();

// GET all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Get all users',
      count: users.length,
      users
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `Get user ${id}`,
      user
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new user
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const userObj = user.toObject() as any;
    delete userObj.password;
    res.status(201).json({
      message: 'User created',
      user: userObj
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, bio },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `User ${id} updated`,
      user
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      message: `User ${id} deleted`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

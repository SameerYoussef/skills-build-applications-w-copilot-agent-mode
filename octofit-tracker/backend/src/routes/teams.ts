import { Router, Request, Response } from 'express';
import Team from '../models/Team.js';

const router = Router();

// GET all teams
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members', 'name email').populate('createdBy', 'name email');
    res.json({
      message: 'Get all teams',
      count: teams.length,
      teams
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET team by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate('members', 'name email').populate('createdBy', 'name email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Get team ${id}`,
      team
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new team
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, createdBy, members } = req.body;
    const team = new Team({ name, description, createdBy, members });
    await team.save();
    const populatedTeam = await Team.findById(team._id).populate('members', 'name email').populate('createdBy', 'name email');
    res.status(201).json({
      message: 'Team created',
      team: populatedTeam
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update team
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, members } = req.body;
    await Team.findByIdAndUpdate(
      id,
      { name, description, members },
      { new: true }
    );
    const team = await Team.findById(id).populate('members', 'name email').populate('createdBy', 'name email');
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Team ${id} updated`,
      team
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE team
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    res.json({
      message: `Team ${id} deleted`
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

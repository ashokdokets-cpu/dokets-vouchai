import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Create user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { phone, name, country, language } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { phone } });

    if (existingUser) {
      return res.json({ success: true, user: existingUser, message: 'Welcome back!' });
    }

    const referralCode = 'VCH' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const user = await prisma.user.create({
      data: {
        phone,
        name: name || 'User' + phone.slice(-4),
        country: country || 'IN',
        language: language || 'en',
        referralCode,
        vouchScore: 100,
        walletBalance: 1.00
      }
    });

    res.json({ success: true, user, message: 'Account created!' });
  } catch (error: any) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get user by phone
router.get('/phone/:phone', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { phone: req.params.phone },
      include: {
        contractsAsClient: { take: 5, orderBy: { createdAt: 'desc' } },
        contractsAsProvider: { take: 5, orderBy: { createdAt: 'desc' } }
      }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Get user by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, email, language, country, city } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(language && { language }),
        ...(country && { country }),
        ...(city && { city })
      }
    });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Get Vouch Score
router.get('/:id/vouch-score', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { vouchScore: true, vouchTier: true, completedContracts: true, completionRate: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch score' });
  }
});

export default router;
import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

const BADGES: Record<string, { name: string; icon: string; price: number; description: string }> = {
  identity: { name: 'Identity Verified', icon: '🆔', price: 5, description: 'Government ID verified' },
  skill: { name: 'Skill Certified', icon: '🏆', price: 3, description: 'Passed skill assessment' },
  background: { name: 'Background Checked', icon: '🔍', price: 15, description: 'Background check passed' },
  premium: { name: 'Premium Provider', icon: '💎', price: 10, description: 'Top-tier verified provider' },
  interview: { name: 'Interview Verified', icon: '✅', price: 8, description: 'Video interview completed' },
};

router.get('/', (req: Request, res: Response) => res.json({ badges: BADGES }));

router.get('/user/:userId', async (req: Request, res: Response) => {
  const achievements = await prisma.userAchievement.findMany({ where: { userId: req.params.userId } });
  res.json(achievements);
});

router.post('/purchase', async (req: Request, res: Response) => {
  try {
    const { userId, badgeId } = req.body;
    const badge = BADGES[badgeId];
    if (!badge) return res.status(400).json({ error: 'Invalid badge' });

    const existing = await prisma.userAchievement.findFirst({ where: { userId, achievement: badgeId } });
    if (existing) return res.status(400).json({ error: 'Badge already earned' });

    await prisma.userAchievement.create({
      data: { userId, achievement: badgeId, name: badge.name, description: badge.description, points: 0, icon: badge.icon }
    });

    await prisma.user.update({ where: { id: userId }, data: { vouchScore: { increment: 5 } } });

    res.json({ success: true, message: `${badge.name} awarded! +5 Vouch Score` });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
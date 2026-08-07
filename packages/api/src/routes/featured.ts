import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Get featured providers
router.get('/', async (req: Request, res: Response) => {
  try {
    const featured = await prisma.user.findMany({
      where: { isFeatured: true, vouchScore: { gte: 50 } },
      select: { id: true, name: true, vouchScore: true, vouchTier: true, country: true, completedContracts: true },
      orderBy: { vouchScore: 'desc' },
      take: 12
    });
    res.json(featured.length > 0 ? featured : getSampleFeatured());
  } catch { res.json(getSampleFeatured()); }
});

// Boost to featured
router.post('/boost', async (req: Request, res: Response) => {
  try {
    const { userId, plan } = req.body;
    const plans: Record<string, { days: number; price: number }> = {
      weekly: { days: 7, price: 5 },
      monthly: { days: 30, price: 10 },
      quarterly: { days: 90, price: 25 }
    };
    const p = plans[plan] || plans.monthly;

    await prisma.user.update({
      where: { id: userId },
      data: { isFeatured: true, featuredExpiry: new Date(Date.now() + p.days * 86400000) }
    });

    res.json({ success: true, message: `Featured for ${plan}!`, price: p.price });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

function getSampleFeatured() {
  return [
    { id: '1', name: 'Ramesh Kumar', vouchScore: 95, vouchTier: 'GOLD', country: 'IN', completedContracts: 48 },
    { id: '2', name: 'Maria Santos', vouchScore: 92, vouchTier: 'GOLD', country: 'BR', completedContracts: 35 },
    { id: '3', name: 'Ahmed Hassan', vouchScore: 88, vouchTier: 'SILVER', country: 'AE', completedContracts: 22 },
  ];
}

export default router;
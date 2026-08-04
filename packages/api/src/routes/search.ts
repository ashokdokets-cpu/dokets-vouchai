import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Global search for providers, skills, services
router.get('/', async (req: Request, res: Response) => {
  try {
    const { q, country, skill } = req.query;
    
    if (!q && !skill) {
      // Return top providers if no query
      const topProviders = await prisma.user.findMany({
        where: { vouchScore: { gte: 50 } },
        select: { id: true, name: true, vouchScore: true, vouchTier: true, country: true },
        orderBy: { vouchScore: 'desc' },
        take: 20
      });
      return res.json(topProviders);
    }

    const searchTerm = (q as string)?.toLowerCase() || (skill as string)?.toLowerCase();
    
    // Search contracts/jobs for matching skills
    const contracts = await prisma.contract.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { location: { contains: searchTerm, mode: 'insensitive' } },
        ],
        status: { in: ['OPEN', 'ACTIVE', 'COMPLETED'] }
      },
      include: {
        provider: { select: { id: true, name: true, vouchScore: true, vouchTier: true, country: true } },
        client: { select: { id: true, name: true, vouchScore: true } }
      },
      take: 30
    });

    // Extract unique providers from contracts
    const providers = contracts
      .filter(c => c.provider)
      .map(c => ({
        id: c.provider!.id,
        name: c.provider!.name,
        vouchScore: c.provider!.vouchScore,
        vouchTier: c.provider!.vouchTier,
        country: c.provider!.country,
        title: c.title,
        location: c.location,
        amount: c.amount,
        currency: c.currency
      }));

    // Also search users directly
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { country: { contains: searchTerm, mode: 'insensitive' } },
        ],
        vouchScore: { gte: 30 }
      },
      select: { id: true, name: true, vouchScore: true, vouchTier: true, country: true },
      take: 20
    });

    res.json({
      query: q || skill,
      providers,
      users: users.map(u => ({
        ...u,
        title: 'Skilled Professional',
        location: u.country || 'Global'
      })),
      total: providers.length + users.length
    });
  } catch (e: any) { 
    res.status(500).json({ error: e.message }); 
  }
});

export default router;
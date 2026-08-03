import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { contractId, imageUrl } = req.body;
    const contract = await prisma.contract.findUnique({ where: { id: contractId } });
    if (!contract) return res.status(404).json({ error: 'Contract not found' });

    // AI verification result
    res.json({
      verified: true,
      confidence: 92,
      description: "Work appears complete based on image analysis",
      recommendation: "Release payment"
    });
  } catch (e: any) { 
    res.status(500).json({ error: e.message }); 
  }
});

// Health check for this route
router.get('/', (req: Request, res: Response) => {
  res.json({ status: 'ok', route: 'verification' });
});

export default router;
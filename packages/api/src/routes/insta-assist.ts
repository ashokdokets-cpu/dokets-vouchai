import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Create Insta Assist request
router.post('/request', async (req: Request, res: Response) => {
  try {
    const { serviceCategory, location, city, country, clientId, clientPhone } = req.body;
    
    // Find providers matching category and location
    const providers = await prisma.user.findMany({
      where: {
        role: { in: ['PROVIDER', 'BOTH'] },
        country: country || 'IN',
        vouchScore: { gte: 50 }
      },
      select: { id: true, name: true, phone: true, vouchScore: true },
      orderBy: { vouchScore: 'desc' },
      take: 5
    });

    if (providers.length === 0) {
      return res.json({ success: false, message: 'No providers available. Please try again later.' });
    }

    // Create the emergency job (contract)
    const vouchId = 'INSTA-' + Date.now().toString(36).toUpperCase();
    const contract = await prisma.contract.create({
      data: {
        vouchId,
        title: `Insta Assist: ${serviceCategory}`,
        description: `Emergency service request - ${serviceCategory} at ${location}`,
        status: 'OPEN',
        amount: 0, // To be quoted by provider
        currency: 'INR',
        finalAmount: 0,
        clientId,
        providerId: null,
        location: location,
        country: country || 'IN',
        city: city || '',
        language: 'en',
        deadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        platformFee: 0,
        totalPaid: 0,
        aiGenerated: true
      }
    });

    // Notify providers via WhatsApp (in production)
    // For now, return the list of providers for the client to choose
    res.json({
      success: true,
      contract,
      providers: providers.map(p => ({
        id: p.id, name: p.name, vouchScore: p.vouchScore
      })),
      message: `${providers.length} providers found! First to accept gets the job.`
    });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Provider accepts Insta Assist job
router.post('/accept', async (req: Request, res: Response) => {
  try {
    const { contractId, providerId } = req.body;
    const contract = await prisma.contract.update({
      where: { id: contractId },
      data: { providerId, status: 'ACCEPTED', startedAt: new Date() }
    });
    res.json({ success: true, contract, message: 'You got the job! Client will be notified.' });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, category, amount, currency, clientId, providerPhone, deadline, location, country, language } = req.body;
    
    let provider = null;
    if (providerPhone) {
      provider = await prisma.user.findUnique({ where: { phone: providerPhone } });
      if (!provider) {
        provider = await prisma.user.create({
          data: {
            phone: providerPhone,
            name: 'User' + providerPhone.slice(-4),
            country: country || 'IN',
            language: language || 'en',
            referralCode: 'VCH' + Math.random().toString(36).substring(2, 8).toUpperCase()
          }
        });
      }
    }

    const vouchId = 'VCH-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();

    const contract = await prisma.contract.create({
      data: {
        vouchId, title, description,
        category: category || 'general',
        amount, currency: currency || 'INR',
        upfrontAmount: Math.round(amount * 0.2),
        finalAmount: amount,
        clientId,
        providerId: provider?.id || null,
        location: location || '',
        country: country || 'IN',
        language: language || 'en',
        deadline: new Date(deadline),
        platformFee: Math.round(amount * 0.01 * 100) / 100,
        aiGenerated: true,
        status: 'PENDING_ACCEPTANCE'
      }
    });
    res.json({ success: true, contract, provider });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/accept', async (req: Request, res: Response) => {
  try {
    const contract = await prisma.contract.update({
      where: { id: req.params.id },
      data: { status: 'ACTIVE', startedAt: new Date() }
    });
    res.json({ success: true, contract });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/complete', async (req: Request, res: Response) => {
  try {
    const existing = await prisma.contract.findUnique({ where: { id: req.params.id } });
    if (!existing) return res.status(404).json({ error: 'Not found' });

    const contract = await prisma.contract.update({
      where: { id: req.params.id },
      data: { status: 'COMPLETED', completedAt: new Date() }
    });

    // Update client
    const client = await prisma.user.findUnique({ where: { id: contract.clientId } });
    if (client) {
      await prisma.user.update({
        where: { id: contract.clientId },
        data: {
          totalContractsAsClient: client.totalContractsAsClient + 1,
          completedContracts: client.completedContracts + 1
        }
      });
    }

    // Update provider
    if (contract.providerId) {
      const provider = await prisma.user.findUnique({ where: { id: contract.providerId } });
      if (provider) {
        await prisma.user.update({
          where: { id: contract.providerId },
          data: {
            completedContracts: provider.completedContracts + 1,
            vouchScore: provider.vouchScore + 10
          }
        });
      }
    }

    res.json({ success: true, contract });
  } catch (error: any) {
    console.error('Complete error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const contracts = await prisma.contract.findMany({
      where: { OR: [{ clientId: req.params.userId }, { providerId: req.params.userId }] },
      include: { client: true, provider: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(contracts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const contract = await prisma.contract.findUnique({
      where: { id: req.params.id },
      include: { client: true, provider: true, payments: true }
    });
    if (!contract) return res.status(404).json({ error: 'Not found' });
    res.json(contract);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
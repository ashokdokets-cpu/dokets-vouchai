import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Get available jobs (Job Board)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { country, city } = req.query;
    
    const where: any = {
      status: 'OPEN',
      providerId: null
    };

    if (country) where.country = country as string;
    if (city) where.location = { contains: city as string };

    const jobs = await prisma.contract.findMany({
      where,
      include: { client: { select: { name: true, vouchScore: true } } },
      orderBy: { createdAt: 'desc' }
    });

    res.json(jobs);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Apply for a job
router.post('/:contractId/apply', async (req: Request, res: Response) => {
  try {
    const { providerId } = req.body;
    const contract = await prisma.contract.findUnique({ where: { id: req.params.contractId } });
    if (!contract || contract.status !== 'OPEN') return res.status(400).json({ error: 'Job not available' });

    // Add provider to applicants
    let applicants = JSON.parse(contract.applicants || '[]');
    if (!applicants.includes(providerId)) {
      applicants.push(providerId);
    }

    await prisma.contract.update({
      where: { id: req.params.contractId },
      data: { applicants: JSON.stringify(applicants) }
    });

    res.json({ success: true, message: 'Applied successfully' });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Client selects a provider
router.post('/:contractId/select', async (req: Request, res: Response) => {
  try {
    const { providerId } = req.body;
    const contract = await prisma.contract.update({
      where: { id: req.params.contractId },
      data: { providerId, status: 'ASSIGNED' }
    });

    // Notify provider via WhatsApp
    if (process.env.TWILIO_ACCOUNT_SID) {
      const provider = await prisma.user.findUnique({ where: { id: providerId } });
      // Send WhatsApp notification here
    }

    res.json({ success: true, contract });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Provider accepts assigned job
router.post('/:contractId/accept', async (req: Request, res: Response) => {
  try {
    const contract = await prisma.contract.update({
      where: { id: req.params.contractId },
      data: { status: 'ACCEPTED', startedAt: new Date() }
    });
    res.json({ success: true, contract });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Get applicants for a contract
router.get('/:contractId/applicants', async (req: Request, res: Response) => {
  const contract = await prisma.contract.findUnique({ where: { id: req.params.contractId } });
  if (!contract) return res.status(404).json({ error: 'Not found' });
  
  const applicantIds = JSON.parse(contract.applicants || '[]');
  const applicants = await prisma.user.findMany({
    where: { id: { in: applicantIds } },
    select: { id: true, name: true, vouchScore: true, vouchTier: true, country: true, city: true }
  });
  
  res.json(applicants);
});

// Post a new job (without provider)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, description, amount, currency, clientId, deadline, location, country, city, jobType, category, skills } = req.body;
    
    const vouchId = 'VCH-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const contract = await prisma.contract.create({
  data: {
    vouchId, title, description,
    amount, currency: currency || 'INR',
    finalAmount: amount,  // ADD THIS LINE
    clientId,
    providerId: null,
    location: location || 'Remote',
    country: country || 'IN',
    language: 'en',
    deadline: new Date(deadline || Date.now() + 14*24*60*60*1000),
    status: 'OPEN',
    platformFee: Math.round(amount * 0.01 * 100) / 100,
    aiGenerated: true
}
});
    
    res.json({ success: true, contract });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Get jobs a provider applied to
router.get('/applied/:providerId', async (req: Request, res: Response) => {
  try {
    const contracts = await prisma.contract.findMany({
      where: {
        isPublic: true,
        OR: [
          { providerId: req.params.providerId },
          { applicants: { contains: req.params.providerId } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(contracts);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
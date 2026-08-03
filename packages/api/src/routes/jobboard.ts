import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Get available jobs (Job Board)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { country, city, jobType, category, skill } = req.query;
    
    const where: any = {
      status: 'OPEN',
      isPublic: true,
      providerId: null
    };

    // Location filter
    if (country) where.country = country as string;
    if (city) where.city = city as string;
    if (jobType) where.jobType = jobType as string;
    if (category) where.category = category as string;

    // For remote jobs, show globally
    if (jobType === 'REMOTE') {
      delete where.country;
      delete where.city;
    }

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

export default router;
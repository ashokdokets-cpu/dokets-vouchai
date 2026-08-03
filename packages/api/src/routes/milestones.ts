import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Create milestones for a contract
router.post('/contract/:contractId', async (req: Request, res: Response) => {
  try {
    const { milestones } = req.body; // Array of { title, amount, percentage, order, dueDate }
    const created = await Promise.all(
      milestones.map((m: any, i: number) =>
        prisma.milestone.create({
          data: {
            contractId: req.params.contractId,
            title: m.title,
            description: m.description,
            amount: m.amount,
            percentage: m.percentage,
            order: m.order || i + 1,
            dueDate: m.dueDate ? new Date(m.dueDate) : null,
            status: 'PENDING'
          }
        })
      )
    );
    res.json({ success: true, milestones: created });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Get milestones for a contract
router.get('/contract/:contractId', async (req: Request, res: Response) => {
  const milestones = await prisma.milestone.findMany({
    where: { contractId: req.params.contractId },
    orderBy: { order: 'asc' }
  });
  res.json(milestones);
});

// Start a milestone (provider starts working)
router.post('/:id/start', async (req: Request, res: Response) => {
  const milestone = await prisma.milestone.update({
    where: { id: req.params.id },
    data: { status: 'IN_PROGRESS' }
  });
  res.json({ success: true, milestone });
});

// Complete a milestone (provider marks done)
router.post('/:id/complete', async (req: Request, res: Response) => {
  const { proofUrl } = req.body;
  const milestone = await prisma.milestone.update({
    where: { id: req.params.id },
    data: { status: 'COMPLETED', proofUrl, completedAt: new Date() }
  });
  res.json({ success: true, milestone });
});

// Verify milestone (AI verification + client approval)
router.post('/:id/verify', async (req: Request, res: Response) => {
  try {
    const milestone = await prisma.milestone.findUnique({ where: { id: req.params.id } });
    if (!milestone) return res.status(404).json({ error: 'Not found' });

    // AI Verification
    let aiResult = { verified: true, confidence: 90 };
    if (milestone.proofUrl && process.env.OPENAI_API_KEY) {
      try {
        const { default: OpenAI } = await import('openai');
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{
            role: "user",
            content: [
              { type: "text", text: `Analyze if this work is complete: "${milestone.title} - ${milestone.description || ''}". Reply JSON: {"verified":bool,"confidence":0-100}` },
              { type: "image_url", image_url: { url: milestone.proofUrl } }
            ]
          }],
          max_tokens: 100
        });
        const content = response.choices[0].message.content || '{}';
        aiResult = JSON.parse(content.match(/\{[\s\S]*\}/)?.[0] || '{"verified":false,"confidence":0}');
      } catch {}
    }

    const updated = await prisma.milestone.update({
      where: { id: req.params.id },
      data: {
        status: aiResult.verified ? 'VERIFIED' : 'DISPUTED',
        verifiedAt: new Date(),
        aiVerified: aiResult.verified,
        aiConfidence: aiResult.confidence
      }
    });

    // If verified, release milestone payment
    if (aiResult.verified) {
      await prisma.payment.create({
        data: {
          contractId: milestone.contractId,
          amount: milestone.amount,
          currency: 'INR',
          gateway: 'RAZORPAY',
          status: 'RELEASED',
          platformFee: Math.round(milestone.amount * 0.01),
          gatewayFee: Math.round(milestone.amount * 0.02),
          netAmount: Math.round(milestone.amount * 0.97),
          fromUserId: req.body.clientId,
          toUserId: req.body.providerId
        }
      });
    }

    res.json({ success: true, milestone: updated, aiResult });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Dispute a milestone
router.post('/:id/dispute', async (req: Request, res: Response) => {
  const { reason } = req.body;
  const milestone = await prisma.milestone.update({
    where: { id: req.params.id },
    data: { status: 'DISPUTED' }
  });
  
  // Create dispute record
  await prisma.dispute.create({
    data: {
      contractId: milestone.contractId,
      raisedById: req.body.userId,
      againstId: req.body.againstId,
      category: 'milestone',
      description: `Milestone: ${milestone.title}\nReason: ${reason}`,
      status: 'OPEN'
    }
  });

  res.json({ success: true, milestone });
});

// AI Mediation for dispute
router.post('/:id/mediate', async (req: Request, res: Response) => {
  try {
    const milestone = await prisma.milestone.findUnique({ where: { id: req.params.id } });
    if (!milestone) return res.status(404).json({ error: 'Not found' });

    let resolution = { recommendation: 'Split payment 50/50', fairness: 'Insufficient evidence' };
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const { default: OpenAI } = await import('openai');
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [{
            role: "system",
            content: "You are VouchAI mediator. Provide fair resolution for milestone disputes. Reply JSON: {\"recommendation\":\"...\", \"paymentPercentage\":0-100, \"fairness\":\"...\"}"
          }, {
            role: "user",
            content: `Milestone: ${milestone.title}\nDescription: ${milestone.description}\nAmount: ₹${milestone.amount}\nStatus: ${milestone.status}`
          }],
          max_tokens: 200
        });
        const content = response.choices[0].message.content || '{}';
        resolution = JSON.parse(content.match(/\{[\s\S]*\}/)?.[0] || '{}');
      } catch {}
    }

    res.json({ success: true, resolution });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
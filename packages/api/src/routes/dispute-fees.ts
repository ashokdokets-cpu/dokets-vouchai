import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

const DISPUTE_FEE: Record<string, number> = {
  INR: 50, USD: 1, EUR: 0.80, GBP: 0.70, JPY: 75,
  AED: 4, BRL: 5, default: 50
};

router.post('/charge', async (req: Request, res: Response) => {
  try {
    const { disputeId, losingPartyId, currency = 'INR' } = req.body;
    const fee = DISPUTE_FEE[currency] || DISPUTE_FEE['default'];
    
    await prisma.payment.create({
      data: {
        contractId: 'dispute_' + disputeId,
        amount: fee, currency, gateway: 'DISPUTE_FEE',
        status: 'RELEASED', platformFee: fee, gatewayFee: 0, netAmount: 0,
        fromUserId: losingPartyId, toUserId: 'system'
      }
    });

    await prisma.dispute.update({
      where: { id: disputeId },
      data: { status: 'RESOLVED', resolvedAt: new Date() }
    });

    res.json({ success: true, fee, message: `Dispute resolved. Fee of ${currency} ${fee} charged.` });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
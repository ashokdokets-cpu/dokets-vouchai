import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// UPI Payout
router.post('/upi', async (req: Request, res: Response) => {
  try {
    const { amount, upiId, userId, contractId } = req.body;
    
    const payment = await prisma.payment.create({
      data: {
        contractId, amount, currency: 'INR', gateway: 'UPI',
        status: 'RELEASED', gatewayOrderId: 'PAYOUT_' + Date.now(),
        platformFee: 0, gatewayFee: 0, netAmount: amount,
        fromUserId: 'system', toUserId: userId
      }
    });

    // In production: Use Razorpay Payout API or UPI SDK
    res.json({ success: true, message: `₹${amount} sent to ${upiId}`, payment });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Bank Transfer Payout
router.post('/bank', async (req: Request, res: Response) => {
  try {
    const { amount, accountNumber, ifsc, userId, contractId } = req.body;
    
    const payment = await prisma.payment.create({
      data: {
        contractId, amount, currency: 'INR', gateway: 'BANK',
        status: 'RELEASED', gatewayOrderId: 'PAYOUT_' + Date.now(),
        platformFee: 0, gatewayFee: 0, netAmount: amount,
        fromUserId: 'system', toUserId: userId
      }
    });

    res.json({ success: true, message: `₹${amount} sent to account ${accountNumber}`, payment });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
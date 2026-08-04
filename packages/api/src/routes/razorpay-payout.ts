import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import prisma from '../config/database';

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Payout to provider via UPI
router.post('/payout', async (req: Request, res: Response) => {
  try {
    const { amount, upiId, providerId, contractId, paymentId } = req.body;
    
    // Create payout via Razorpay
    const payout = await razorpay.payouts.create({
      account_number: process.env.RAZORPAY_ACCOUNT_NUMBER || '',
      amount: Math.round(amount * 100), // in paise
      currency: 'INR',
      mode: 'UPI',
      purpose: 'refund',
      fund_account: {
        account_type: 'vpa',
        vpa: {
          address: upiId
        }
      },
      queue_if_low_balance: true,
      reference_id: 'payout_' + contractId,
      narration: 'Dokets VouchAI - Payment for work completed',
      notes: { contractId, providerId }
    });

    // Update payment record
    if (paymentId) {
      await prisma.payment.update({
        where: { id: paymentId },
        data: { 
          status: 'RELEASED',
          gatewayPaymentId: payout.id
        }
      });
    }

    // Update provider wallet
    await prisma.user.update({
      where: { id: providerId },
      data: { walletBalance: { increment: amount } }
    });

    res.json({ 
      success: true, 
      payout: { id: payout.id, amount, status: payout.status },
      message: `₹${amount} sent to ${upiId}`
    });
  } catch (e: any) { 
    res.status(500).json({ error: e.message }); 
  }
});

// Check payout status
router.get('/payout/:payoutId', async (req: Request, res: Response) => {
  try {
    const payout = await razorpay.payouts.fetch(req.params.payoutId);
    res.json(payout);
  } catch (e: any) { 
    res.status(500).json({ error: e.message }); 
  }
});

export default router;
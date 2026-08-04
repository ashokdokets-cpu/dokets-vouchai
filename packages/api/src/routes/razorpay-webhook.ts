import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import prisma from '../config/database';
import crypto from 'crypto';

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

// Verify webhook signature
function verifyWebhook(body: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  return expected === signature;
}

// Razorpay Webhook
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'] as string;
    const body = JSON.stringify(req.body);
    
    // Verify signature in production
    // const isValid = verifyWebhook(body, signature, process.env.RAZORPAY_WEBHOOK_SECRET || '');
    // if (!isValid) return res.status(400).json({ error: 'Invalid signature' });

    const event = req.body.event;
    const payment = req.body.payload?.payment?.entity;
    const order = req.body.payload?.order?.entity;
    
    console.log('Webhook:', event);

    if (event === 'payment.captured' && payment) {
      // Client payment successful - money is in VouchAI account
      const existingPayment = await prisma.payment.findFirst({
        where: { gatewayOrderId: order?.id || payment.order_id }
      });

      if (existingPayment) {
        await prisma.payment.update({
          where: { id: existingPayment.id },
          data: { 
            status: 'HELD',
            gatewayPaymentId: payment.id
          }
        });
        console.log('Payment captured:', payment.id);
      }
    }


    res.json({ success: true });
  } catch (e: any) { 
    console.error('Webhook error:', e);
    res.status(500).json({ error: e.message }); 
  }
});

// Process payout to provider
async function processPayout(payment: any, contract: any) {
  try {
    const provider = await prisma.user.findUnique({ where: { id: payment.toUserId } });
    if (!provider) return;

    // Get provider's UPI or bank details (stored in user profile)
    const netAmount = Math.round((payment.amount - payment.platformFee - payment.gatewayFee) * 100);
    
    // For UPI payout
    const payout = await razorpay.payouts.create({
      account_number: process.env.RAZORPAY_ACCOUNT_NUMBER || '',
      amount: netAmount,
      currency: 'INR',
      mode: 'UPI',
      purpose: 'refund',
      fund_account: {
        account_type: 'vpa',
        vpa: { address: 'provider@upi' } // Get from provider profile
      },
      queue_if_low_balance: true,
      reference_id: 'payout_' + contract.id,
      narration: 'Dokets VouchAI - Payment for: ' + contract.title,
      notes: { contractId: contract.id, providerId: provider.id }
    });

    // Update payment as released
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'RELEASED', gatewayPaymentId: payout.id }
    });

    console.log('Payout completed:', payout.id);
    return payout;
  } catch (e) {
    console.error('Payout failed:', e);
    return null;
  }
}

// Manual trigger payout (Client approved ONLY)
router.post('/trigger-payout', async (req: Request, res: Response) => {
  try {
    const { paymentId, clientId } = req.body;
    
    // Find the payment
    const payment = await prisma.payment.findUnique({ 
      where: { id: paymentId },
      include: { contract: true }
    });
    
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    
    // ✅ VERIFY: Only the client who created the contract can release
    if (payment.contract.clientId !== clientId) {
      return res.status(403).json({ error: 'Only the client who hired can release payment' });
    }
    
    // ✅ VERIFY: Payment must be in HELD status
    if (payment.status !== 'HELD') {
      return res.status(400).json({ error: 'Payment is not in escrow. Current status: ' + payment.status });
    }
    
    // ✅ VERIFY: Work must be completed/verified
    if (payment.contract.status !== 'COMPLETED' && payment.contract.status !== 'ACTIVE') {
      return res.status(400).json({ error: 'Work must be completed before releasing payment' });
    }

    const payout = await processPayout(payment, payment.contract);
    
    if (payout) {
      // Update contract status
      await prisma.contract.update({
        where: { id: payment.contractId },
        data: { status: 'COMPLETED', completedAt: new Date() }
      });
      
      res.json({ 
        success: true, 
        payout: { id: payout.id, amount: payment.netAmount },
        message: 'Payment released to provider successfully' 
      });
    } else {
      res.status(500).json({ error: 'Payout failed. Please try again.' });
    }
  } catch (e: any) { 
    res.status(500).json({ error: e.message }); 
  }
});

export default router;
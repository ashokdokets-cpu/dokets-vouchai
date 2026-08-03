import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import prisma from '../config/database';
import { calculateFee } from '../utils/fees';

const router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy'
});

// Create order
router.post('/create-order', async (req: Request, res: Response) => {
  try {
    const { amount, currency, contractId, userId, providerId } = req.body;
    
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: currency || 'INR',
      receipt: 'contract_' + contractId,
      notes: { contractId, userId, providerId }
    });

    res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency, key: process.env.RAZORPAY_KEY_ID });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Verify payment
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, contractId, userId, providerId, amount } = req.body;
    
    const crypto = require('crypto');
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '').update(sign).digest('hex');

    if (razorpay_signature === expected) {
      const platformFee = calculateFee(amount, currency || 'INR').fee;
      const gatewayFee = Math.round(amount * 0.02);
      
      await prisma.payment.create({
        data: {
          contractId, amount, currency: 'INR', gateway: 'RAZORPAY', status: 'HELD',
          gatewayOrderId: razorpay_order_id, gatewayPaymentId: razorpay_payment_id,
          platformFee, gatewayFee, netAmount: amount - platformFee - gatewayFee,
          fromUserId: userId, toUserId: providerId
        }
      });

      res.json({ success: true, verified: true });
    } else {
      res.json({ success: false, verified: false });
    }
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
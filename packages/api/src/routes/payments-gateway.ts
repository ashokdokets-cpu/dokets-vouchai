import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// ============================================
// RAZORPAY INTEGRATION
// ============================================

// Create Razorpay order
router.post('/razorpay/create-order', async (req: Request, res: Response) => {
  try {
    const { amount, currency, contractId, userId, providerId } = req.body;
    
    // In production, use Razorpay SDK here
    // For now, create a simulated order
    const orderId = 'order_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Hold payment in escrow
    const platformFee = Math.round(amount * 0.01 * 100) / 100;
    const gatewayFee = Math.round(amount * 0.02 * 100) / 100;
    const netAmount = amount - platformFee - gatewayFee;

    const payment = await prisma.payment.create({
      data: {
        contractId,
        amount,
        currency: currency || 'INR',
        gateway: 'RAZORPAY',
        status: 'HELD',
        gatewayOrderId: orderId,
        platformFee,
        gatewayFee,
        netAmount,
        fromUserId: userId,
        toUserId: providerId
      }
    });

    await prisma.contract.update({
      where: { id: contractId },
      data: { totalPaid: { increment: amount } }
    });

    res.json({
      success: true,
      orderId,
      amount: amount * 100, // in paise for Razorpay
      currency: currency || 'INR',
      payment
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Verify Razorpay payment
router.post('/razorpay/verify', async (req: Request, res: Response) => {
  try {
    const { orderId, paymentId, signature, contractId } = req.body;
    
    // Verify signature in production
    const verified = true; // Simplified for now
    
    if (verified) {
      await prisma.payment.updateMany({
        where: { gatewayOrderId: orderId },
        data: { gatewayPaymentId: paymentId, status: 'HELD' }
      });

      res.json({ success: true, verified: true });
    } else {
      res.status(400).json({ success: false, verified: false });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// PAYPAL INTEGRATION
// ============================================

// Create PayPal order
router.post('/paypal/create-order', async (req: Request, res: Response) => {
  try {
    const { amount, currency, contractId, userId, providerId } = req.body;
    
    const orderId = 'PAYPAL_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const platformFee = Math.round(amount * 0.01 * 100) / 100;
    const gatewayFee = Math.round(amount * 0.044 * 100) / 100 + 0.30;
    const netAmount = amount - platformFee - gatewayFee;

    const payment = await prisma.payment.create({
      data: {
        contractId,
        amount,
        currency: currency || 'USD',
        gateway: 'PAYPAL',
        status: 'HELD',
        gatewayOrderId: orderId,
        platformFee,
        gatewayFee,
        netAmount,
        fromUserId: userId,
        toUserId: providerId
      }
    });

    res.json({
      success: true,
      orderId,
      amount,
      currency,
      payment
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Capture PayPal payment
router.post('/paypal/capture', async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    
    await prisma.payment.updateMany({
      where: { gatewayOrderId: orderId },
      data: { status: 'HELD' }
    });

    res.json({ success: true, captured: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// COMMON PAYMENT OPERATIONS
// ============================================

// Get payment status
router.get('/status/:paymentId', async (req: Request, res: Response) => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: req.params.paymentId }
    });
    res.json(payment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all payments for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        OR: [
          { fromUserId: req.params.userId },
          { toUserId: req.params.userId }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
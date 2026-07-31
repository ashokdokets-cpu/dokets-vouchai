import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Hold payment
router.post('/hold', async (req: Request, res: Response) => {
  try {
    const { contractId, amount, currency, gateway, fromUserId, toUserId } = req.body;
    const platformFee = Math.round(amount * 0.01 * 100) / 100;
    const gatewayFee = Math.round(amount * 0.02 * 100) / 100;
    const netAmount = amount - platformFee - gatewayFee;

    const payment = await prisma.payment.create({
      data: {
        contractId,
        amount,
        currency: currency || 'INR',
        gateway: gateway || 'RAZORPAY',
        status: 'HELD',
        platformFee,
        gatewayFee,
        netAmount,
        fromUserId,
        toUserId
      }
    });

    await prisma.contract.update({
      where: { id: contractId },
      data: { totalPaid: { increment: amount } }
    });

    res.json({ success: true, payment });
  } catch (error: any) {
    console.error('Payment hold error:', error);
    res.status(500).json({ error: 'Failed to hold payment' });
  }
});

// Release payment
router.post('/release', async (req: Request, res: Response) => {
  try {
    const { contractId } = req.body;
    const payment = await prisma.payment.findFirst({
      where: { contractId, status: 'HELD' }
    });

    if (!payment) return res.status(404).json({ error: 'No held payment found' });

    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'RELEASED' }
    });

    if (payment.toUserId) {
      await prisma.user.update({
        where: { id: payment.toUserId },
        data: { walletBalance: { increment: payment.netAmount } }
      });
    }

    res.json({ success: true, payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to release payment' });
  }
});

// Refund payment
router.post('/refund', async (req: Request, res: Response) => {
  try {
    const { contractId } = req.body;
    const payment = await prisma.payment.findFirst({
      where: { contractId, status: 'HELD' }
    });

    if (!payment) return res.status(404).json({ error: 'No held payment found' });

    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: { status: 'REFUNDED' }
    });

    if (payment.fromUserId) {
      await prisma.user.update({
        where: { id: payment.fromUserId },
        data: { walletBalance: { increment: payment.amount } }
      });
    }

    res.json({ success: true, payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to refund payment' });
  }
});

// Get payments for contract
router.get('/contract/:contractId', async (req: Request, res: Response) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { contractId: req.params.contractId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

export default router;
import { Router, Request, Response } from 'express';
import prisma from '../config/database';
import { getSubscriptionPrice } from '../utils/fees';

const router = Router();

// Get plans for user's currency
router.get('/plans', (req: Request, res: Response) => {
  const currency = (req.query.currency as string) || 'INR';
  const plans = getSubscriptionPrice(currency);
  
  res.json({
    currency,
    plans: {
      free: { price: plans.free, deals: 3, fee: '3%', features: ['3 deals/month', 'Standard AI', 'WhatsApp notifications'] },
      pro: { price: plans.pro, deals: 'Unlimited', fee: '1.5%', features: ['Unlimited deals', 'Priority AI', 'Custom WhatsApp links', 'Vouch Score boost'] },
      business: { price: plans.business, deals: 'Unlimited', fee: '1%', features: ['Everything in Pro', 'API access', 'White-label', 'Priority support', 'Team accounts'] }
    }
  });
});

// Subscribe user
router.post('/subscribe', async (req: Request, res: Response) => {
  try {
    const { userId, plan } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true, premiumExpiry: new Date(Date.now() + 30*24*60*60*1000) }
    });
    res.json({ success: true, user });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
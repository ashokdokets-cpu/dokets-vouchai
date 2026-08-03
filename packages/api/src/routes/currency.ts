import { Router, Request, Response } from 'express';

const router = Router();

const rates: Record<string, number> = {
  INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095, AED: 0.044, SGD: 0.016, AUD: 0.018, CAD: 0.016, BRL: 0.059
};

router.get('/rates', (req: Request, res: Response) => {
  res.json({ base: 'INR', rates, updated: new Date().toISOString() });
});

router.post('/convert', (req: Request, res: Response) => {
  const { amount, from, to } = req.body;
  const inINR = amount / (rates[from] || 1);
  const converted = inINR * (rates[to] || 1);
  res.json({ amount: Math.round(converted * 100) / 100, from, to, rate: rates[to] / rates[from] });
});

export default router;
import { Router, Request, Response } from 'express';

const router = Router();

const rates: Record<string, number> = {
  INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095, 
  AED: 0.044, SAR: 0.045, QAR: 0.044,
  SGD: 0.016, AUD: 0.018, CAD: 0.016, NZD: 0.019,
  BRL: 0.059, MXN: 0.20, ARS: 10.50, COP: 48,
  JPY: 1.75, CNY: 0.087, KRW: 15.50, IDR: 190, THB: 0.43,
  NGN: 18.50, KES: 1.55, ZAR: 0.22, EGP: 0.58,
  PHP: 0.67, VND: 295
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
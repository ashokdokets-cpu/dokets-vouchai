import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com', // Godaddy uses Office 365
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'contact@dokets.com',
    pass: process.env.EMAIL_PASS || ''
  }
});

router.post('/send', async (req: Request, res: Response) => {
  try {
    const { to, subject, html } = req.body;
    await transporter.sendMail({
      from: '"Dokets VouchAI" <contact@dokets.com>',
      to, subject, html
    });
    res.json({ success: true });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

// Auto-send notifications
export async function sendContractEmail(to: string, contract: any) {
  try {
    await transporter.sendMail({
      from: '"Dokets VouchAI" <contact@dokets.com>',
      to,
      subject: `New Contract: ${contract.title}`,
      html: `<h2>Contract Created!</h2><p><strong>${contract.title}</strong></p><p>Amount: ₹${contract.amount}</p><p>Vouch ID: ${contract.vouchId}</p><a href="https://dokets.com/contracts/${contract.id}">View Contract</a>`
    });
  } catch (e) { console.log('Email error:', e); }
}

export default router;
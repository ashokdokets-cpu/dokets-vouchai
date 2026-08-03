import { Router, Request, Response } from 'express';
import OpenAI from 'openai';
import prisma from '../config/database';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/mediate', async (req: Request, res: Response) => {
  try {
    const { disputeId } = req.body;
    const dispute = await prisma.dispute.findUnique({ 
      where: { id: disputeId },
      include: { contract: true, messages: true }
    });
    
    if (!dispute) return res.status(404).json({ error: 'Dispute not found' });

    const chatHistory = dispute.messages.map(m => `${m.senderId}: ${m.message}`).join('\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: "You are VouchAI, a neutral AI mediator for informal work disputes. Provide fair, culturally-aware resolutions in JSON format."
      }, {
        role: "user",
        content: `Contract: ${dispute.contract.title}\nDescription: ${dispute.contract.description}\nAmount: ₹${dispute.contract.amount}\nDispute: ${dispute.description}\nChat:\n${chatHistory}\n\nProvide resolution as JSON: {"recommendation": "...", "paymentResolution": "...", "fairnessExplanation": "..."}`
      }],
      max_tokens: 300
    });

    const resolution = JSON.parse(response.choices[0].message.content || '{"recommendation":"Escalate to human"}');
    
    await prisma.dispute.update({
      where: { id: disputeId },
      data: { aiRecommendation: resolution.recommendation, status: 'RESOLVED', resolvedAt: new Date() }
    });

    res.json({ success: true, resolution });
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
import { Router, Request, Response } from 'express';
import OpenAI from 'openai';
import prisma from '../config/database';

const router = Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { contractId, imageUrl } = req.body;
    
    const contract = await prisma.contract.findUnique({ where: { id: contractId } });
    if (!contract) return res.status(404).json({ error: 'Contract not found' });

    // AI verification using GPT-4 Vision
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: `Analyze this image. The work described was: "${contract.description}". Is the work complete? Respond with JSON: {"verified": true/false, "confidence": 0-100, "description": "what you see"}` },
          { type: "image_url", image_url: { url: imageUrl } }
        ]
      }],
      max_tokens: 200
    });

    const result = JSON.parse(response.choices[0].message.content || '{"verified":false,"confidence":0}');
    res.json(result);
  } catch (e: any) { res.status(500).json({ error: e.message }); }
});

export default router;
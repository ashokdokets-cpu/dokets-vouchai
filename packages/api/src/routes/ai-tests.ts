import { Router, Request, Response } from 'express';

const router = Router();

// Generate AI questions for any skill
router.post('/generate-test', async (req: Request, res: Response) => {
  try {
    const { skill } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      return res.json({ 
        questions: [
          { q: `What is the most important factor in ${skill}?`, options: ['Quality', 'Speed', 'Cost', 'Experience'], answer: 0 },
          { q: `How do you ensure quality in ${skill}?`, options: ['Practice', 'Study', 'Certification', 'All of above'], answer: 3 },
          { q: `What tool is essential for ${skill}?`, options: ['Basic tools', 'Advanced equipment', 'Software', 'Depends on task'], answer: 3 },
          { q: `How do you handle difficult ${skill} tasks?`, options: ['Ask for help', 'Research', 'Practice more', 'All of above'], answer: 3 },
          { q: `Best way to improve ${skill} skills?`, options: ['Daily practice', 'Online courses', 'Mentorship', 'All of above'], answer: 3 },
        ]
      });
    }

    // Use OpenAI to generate real questions
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "system",
        content: "You are a skill testing expert. Generate 5 multiple-choice questions to test someone's knowledge. Output ONLY a JSON array. Each question has: q (question), options (4 choices array), answer (index 0-3 of correct option). Make questions practical and varied in difficulty."
      }, {
        role: "user",
        content: `Generate a skill test for: ${skill}`
      }],
      max_tokens: 500
    });

    const content = response.choices[0].message.content || '[]';
    const questions = JSON.parse(content.match(/\[[\s\S]*\]/)?.[0] || '[]');
    
    res.json({ questions: questions.length > 0 ? questions : getDefaultQuestions(skill) });
  } catch (e: any) { 
    res.json({ questions: getDefaultQuestions(req.body.skill) }); 
  }
});

function getDefaultQuestions(skill: string) {
  return [
    { q: `What is most important for ${skill}?`, options: ['Quality', 'Speed', 'Cost', 'Experience'], answer: 0 },
    { q: `How do you ensure quality in ${skill}?`, options: ['Practice', 'Study', 'Certification', 'All of above'], answer: 3 },
    { q: `Best way to improve ${skill}?`, options: ['Daily practice', 'Online courses', 'Mentorship', 'All of above'], answer: 3 },
    { q: `What is a common mistake in ${skill}?`, options: ['Rushing', 'Poor planning', 'Wrong tools', 'All of above'], answer: 3 },
    { q: `How to handle ${skill} emergencies?`, options: ['Stay calm', 'Call expert', 'Follow protocol', 'All of above'], answer: 3 },
  ];
}

export default router;
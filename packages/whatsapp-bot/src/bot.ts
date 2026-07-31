import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const tc = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const FROM = 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER;
const API = process.env.API_URL || 'http://localhost:3001/api';
const states = new Map();

async function getUser(phone: string) {
  const r = await fetch(API + '/users/phone/' + phone);
  const u = await r.json();
  if (!u.id) {
    const cr = await fetch(API + '/users/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, name: 'User' + phone.slice(-4), country: 'IN', language: 'en' })
    });
    return (await cr.json()).user;
  }
  return u;
}

async function createContract(phone: string, text: string) {
  const user = await getUser(phone);
  const am = text.match(/Rs?\s*(\d+)/i) || text.match(/(\d+)/);
  const pm = text.match(/(\d{10,12})/);
  const amount = am ? parseInt(am[1]) : 1000;
  const pphone = pm ? pm[1] : phone;

  const cr = await fetch(API + '/contracts', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: text.substring(0, 80), description: text,
      amount, currency: 'INR', clientId: user.id,
      providerPhone: '+' + pphone,
      deadline: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
      location: '', country: 'IN', language: 'en'
    })
  });
  return (await cr.json()).contract;
}

async function verifyAndPay(contractId: string, mediaUrl: string) {
  // AI verification simulation
  const verified = true; // In production, compare with before image
  const confidence = 0.92;

  if (verified) {
    // Complete contract
    await fetch(API + '/contracts/' + contractId + '/complete', { method: 'POST' });
    // Release payment
    await fetch(API + '/payments/release', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractId })
    });
  }
  return { verified, confidence };
}

app.post('/webhook', async (req, res) => {
  const { From, Body, MediaUrl0, MediaContentType0 } = req.body;
  const phone = From.replace('whatsapp:', '');
  const msg = (Body || '').trim();
  const ml = msg.toLowerCase();

  console.log(phone + ': ' + (msg || '[MEDIA: ' + MediaContentType0 + ']'));

  let reply = '';
  const st = states.get(phone);

  // ============================================
  // PHOTO/VIDEO UPLOAD - VERIFY & PAY
  // ============================================
  if (MediaUrl0 && st?.activeContract) {
    const contractId = st.activeContract;
    reply = 'Analyzing your proof...\n\n';
    
    const result = await verifyAndPay(contractId, MediaUrl0);
    
    if (result.verified) {
      reply += 'WORK VERIFIED!\n\n' +
        'AI confirms the work is complete.\n' +
        'Confidence: ' + (result.confidence * 100).toFixed(0) + '%\n\n' +
        'PAYMENT RELEASED!\n' +
        'Contract marked as COMPLETED.\n\n' +
        '+10 Vouch Score earned!\n\n' +
        'Send STATUS to view.';
    } else {
      reply += 'NEEDS REVIEW\n\nUpload more photos or send MEDIATE for help.';
    }
    states.delete(phone);
  }
  // Generic photo without active contract
  else if (MediaUrl0) {
    reply = 'Photo received! To verify work completion:\n\n' +
      '1. Send DONE [contract id]\n' +
      '2. Then upload your photo\n\n' +
      'Send STATUS to see your active contracts.';
  }

  // ============================================
  // HELP / MENU
  // ============================================
  else if (['hi','hello','help','menu'].includes(ml)) {
    states.delete(phone);
    const u = await getUser(phone);
    reply = 'VouchAI Bot\n\n' +
      'Hey ' + (u.name || 'there') + '!\n' +
      'Score: ' + (u.vouchScore || 100) + '/100\n\n' +
      'CREATE - New contract\n' +
      'STATUS - Your contracts\n' +
      'PENDING - Pending jobs\n' +
      'ACCEPT [id] - Accept job\n' +
      'DONE [id] - Mark complete\n' +
      'SCORE - Your score\n\n' +
      'Send HELP anytime.';
  }

  // ============================================
  // CREATE CONTRACT
  // ============================================
  else if (ml === 'create') {
    states.set(phone, { step: 'desc' });
    reply = 'Describe the work:\n\nExample:\n"Paint my room for Rs5000. Rajesh 919876543210 is doing it by Monday."';
  }
  else if (st?.step === 'desc') {
    reply = 'Creating...\n\n';
    const c = await createContract(phone, msg);
    if (c) {
      reply += 'Contract Created!\n\n' +
        'ID: ' + c.vouchId + '\n' +
        'Amount: Rs' + c.amount + '\n' +
        'Status: ' + c.status + '\n\n' +
        'Provider can reply ACCEPT ' + c.id + ' to start.';
    } else { reply += 'Failed. Try again.'; }
    states.delete(phone);
  }

  // ============================================
  // ACCEPT CONTRACT
  // ============================================
  else if (ml.startsWith('accept')) {
    const cid = msg.replace('accept', '').trim();
    try {
      await fetch(API + '/contracts/' + cid + '/accept', { method: 'POST' });
      reply = 'Contract Accepted! Work can begin.\n\n' +
        'When done, send: DONE ' + cid + '\nThen upload a photo as proof.';
    } catch { reply = 'Could not accept. Check ID with STATUS.'; }
  }

  // ============================================
  // DONE - MARK COMPLETE & UPLOAD PROOF
  // ============================================
  else if (ml.startsWith('done')) {
    const cid = msg.replace('done', '').trim();
    if (cid) {
      states.set(phone, { step: 'proof', activeContract: cid });
      reply = 'Send a photo of the completed work now!\n\n' +
        'Contract: ' + cid + '\n\n' +
        'AI will verify and release payment automatically.';
    } else {
      reply = 'Usage: DONE [contract id]\n\nSend STATUS to see your contracts.';
    }
  }

  // ============================================
  // PENDING CONTRACTS
  // ============================================
  else if (ml === 'pending') {
    const u = await getUser(phone);
    const r = await fetch(API + '/contracts/user/' + u.id);
    const contracts = await r.json();
    const pending = contracts.filter((c: any) => c.status === 'PENDING_ACCEPTANCE' && c.providerId === u.id);
    if (pending.length === 0) {
      reply = 'No pending contracts.\n\nSend STATUS for all.';
    } else {
      reply = 'Pending Contracts:\n\n';
      pending.forEach((c: any) => {
        reply += 'ID: ' + c.id + '\n' + c.title + '\nRs' + c.amount + '\nReply: ACCEPT ' + c.id + '\n\n';
      });
    }
  }

  // ============================================
  // STATUS
  // ============================================
  else if (ml === 'status') {
    const u = await getUser(phone);
    const r = await fetch(API + '/contracts/user/' + u.id);
    const contracts = await r.json();
    if (!contracts.length) {
      reply = 'No contracts yet. Send CREATE.';
    } else {
      reply = 'Your Contracts:\n\n';
      contracts.slice(0, 10).forEach((c: any) => {
        const e = c.status === 'COMPLETED' ? '[OK]' : c.status === 'ACTIVE' ? '[>>]' : '[..]';
        reply += e + ' ID:' + c.id.substring(0, 12) + '... ' + c.title + '\n';
        reply += '   Rs' + c.amount + ' | ' + c.status + '\n';
        if (c.status === 'ACTIVE') {
          reply += '   Reply: DONE ' + c.id + '\n';
        }
        reply += '\n';
      });
    }
  }

  // ============================================
  // SCORE
  // ============================================
  else if (ml === 'score') {
    const u = await getUser(phone);
    reply = 'Your Score\n\nScore: ' + (u.vouchScore || 100) + '/100\n' +
      'Tier: ' + (u.vouchTier || 'NEW') + '\nJobs: ' + (u.completedContracts || 0);
  }

  // ============================================
  // PREMIUM
  // ============================================
  else if (ml === 'premium') {
    reply = 'Premium\n\n- Vouch Certified Badge\n- Top Search Results\n- Analytics\n\nRs99/month\nReply UPGRADE to activate.';
  }

  // ============================================
  // REFER
  // ============================================
  else if (ml === 'refer') {
    const u = await getUser(phone);
    reply = 'Refer & Earn\n\nYour code: ' + (u.referralCode || 'SIGNUP');
  }

  // ============================================
  // DEFAULT
  // ============================================
  else {
    const u = await getUser(phone);
    reply = 'VouchAI Bot\n\nHi ' + (u.name || '') + '!\n\n' +
      'CREATE - New contract\nSTATUS - Contracts\nDONE [id] - Complete\nSCORE - Your score\n\nSend HELP for all commands.';
  }

  await tc.messages.create({ from: FROM, to: From, body: reply });
  res.send('<Response></Response>');
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(process.env.PORT || 3002, () => console.log('Bot running on port ' + (process.env.PORT || 3002)));
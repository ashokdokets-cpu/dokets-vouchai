import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

import userRoutes from './routes/users';
import contractRoutes from './routes/contracts';
import paymentRoutes from './routes/payments';

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Twilio client
const tc = process.env.TWILIO_ACCOUNT_SID ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN) : null;
const FROM = 'whatsapp:' + (process.env.TWILIO_WHATSAPP_NUMBER || '+12232264859');
const API_URL = process.env.API_URL || 'https://dokets-vouchai.onrender.com/api';

// User states for WhatsApp
const states: Map<string, any> = new Map();

async function getUser(phone: string) {
  const r = await fetch(API_URL + '/users/phone/' + phone);
  const u = await r.json();
  if (!u.id) {
    const cr = await fetch(API_URL + '/users/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, name: 'User' + phone.slice(-4), country: 'IN', language: 'en' })
    });
    return (await cr.json()).user;
  }
  return u;
}

// WhatsApp webhook
app.post('/webhook', async (req, res) => {
  const { From, Body, MediaUrl0 } = req.body;
  if (!From) return res.send('<Response></Response>');
  
  let phone = From.replace('whatsapp:', '').replace(/\s/g, '');
  if (!phone.startsWith('+')) phone = '+' + phone;
  const msg = (Body || '').trim();
  const ml = msg.toLowerCase();
  
  console.log('WhatsApp:', phone, '-', msg || '[media]');
  
  let reply = '';
  const st = states.get(phone);

  // Photo proof
  if (MediaUrl0 && st?.activeContract) {
    const cid = st.activeContract;
    try {
      await fetch(API_URL + '/contracts/' + cid + '/complete', { method: 'POST' });
      await fetch(API_URL + '/payments/release', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractId: cid })
      });
      reply = 'Work Verified!\n\nPayment Released!\n+10 Vouch Score!\n\nSend STATUS to view.';
    } catch { reply = 'Error processing. Try again.'; }
    states.delete(phone);
  }
  else if (MediaUrl0) {
    reply = 'Photo received! To verify work, send DONE [contract id] first, then upload photo.';
  }
  else if (['hi','hello','help','menu'].includes(ml)) {
    states.delete(phone);
    const u = await getUser(phone);
    reply = 'VouchAI Bot\n\nHey ' + (u.name || 'there') + '!\nScore: ' + (u.vouchScore || 100) + '/100\n\nCREATE - New contract\nSTATUS - Contracts\nPENDING - Pending\nACCEPT [id] - Accept\nDONE [id] - Complete\nSCORE - Score';
  }
  else if (ml === 'create') {
    states.set(phone, { step: 'desc' });
    reply = 'Describe the work:\n\n"Paint room for Rs5000. Rajesh 919876543210 by Friday"';
  }
  else if (st?.step === 'desc') {
    const user = await getUser(phone);
    const am = msg.match(/Rs?\s*(\d+)/i) || msg.match(/(\d+)/);
    const pm = msg.match(/(\d{10,12})/);
    const amount = am ? parseInt(am[1]) : 1000;
    const pphone = pm ? pm[1] : phone;
    
    try {
      const cr = await fetch(API_URL + '/contracts', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: msg.substring(0, 80), description: msg,
          amount, currency: 'INR', clientId: user.id,
          providerPhone: '+' + pphone,
          deadline: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
          location: '', country: 'IN', language: 'en'
        })
      });
      const d = await cr.json();
      reply = 'Contract Created!\n\nID: ' + d.contract.vouchId + '\nAmount: Rs' + amount + '\nStatus: ' + d.contract.status;
    } catch { reply = 'Failed. Try again.'; }
    states.delete(phone);
  }
  else if (ml.startsWith('accept')) {
    const cid = msg.replace('accept', '').trim();
    try {
      await fetch(API_URL + '/contracts/' + cid + '/accept', { method: 'POST' });
      reply = 'Contract Accepted! Work can begin.\nSend DONE ' + cid + ' when finished.';
    } catch { reply = 'Could not accept.'; }
  }
  else if (ml.startsWith('done')) {
    const cid = msg.replace('done', '').trim();
    states.set(phone, { step: 'proof', activeContract: cid });
    reply = 'Send a photo of the completed work now!';
  }
  else if (ml === 'pending') {
    const u = await getUser(phone);
    const r = await fetch(API_URL + '/contracts/user/' + u.id);
    const contracts = await r.json();
    const pending = contracts.filter((c: any) => c.status === 'PENDING_ACCEPTANCE');
    reply = pending.length === 0 ? 'No pending contracts.' : 'Pending:\n\n' + pending.map((c: any) => 'ID: ' + c.id + '\n' + c.title + '\nRs' + c.amount).join('\n\n');
  }
  else if (ml === 'status') {
    const u = await getUser(phone);
    const r = await fetch(API_URL + '/contracts/user/' + u.id);
    const contracts = await r.json();
    reply = contracts.length === 0 ? 'No contracts.' : 'Contracts:\n\n' + contracts.slice(0, 10).map((c: any) => {
      const e = c.status === 'COMPLETED' ? '[OK]' : c.status === 'ACTIVE' ? '[>>]' : '[..]';
      return e + ' ' + c.title + '\nRs' + c.amount + ' | ' + c.status;
    }).join('\n\n');
  }
  else if (ml === 'score') {
    const u = await getUser(phone);
    reply = 'Score: ' + (u.vouchScore || 100) + '/100\nTier: ' + (u.vouchTier || 'NEW') + '\nJobs: ' + (u.completedContracts || 0);
  }
  else { reply = 'VouchAI Bot\n\nCREATE | STATUS | SCORE | HELP'; }

  if (tc) {
  await tc.messages.create({ from: FROM, to: From, body: reply }).catch(e => console.log('Twilio send error:', e.message));
}
  res.send('<Response></Response>');
});

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'VouchAI API', timestamp: new Date().toISOString(), version: '2.0.0' });
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => console.log('VouchAI running on port ' + PORT));
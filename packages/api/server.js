const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch(e) {
    res.json({ status: 'error', msg: e.message });
  }
});

app.listen(10000, function() {
  console.log('Running on 10000');
});
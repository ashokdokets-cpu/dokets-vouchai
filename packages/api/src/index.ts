import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './routes/users';
import contractRoutes from './routes/contracts';
import paymentRoutes from './routes/payments';
import paymentGatewayRoutes from './routes/payments-gateway';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'VouchAI API',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  });
});

app.use('/api/users', userRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/payments/gateway', paymentGatewayRoutes);

app.listen(PORT, () => {
  console.log('============================================');
  console.log('  VouchAI API Server Running');
  console.log('  Port: ' + PORT);
  console.log('  http://localhost:' + PORT + '/health');
  console.log('============================================');
});

export default app;
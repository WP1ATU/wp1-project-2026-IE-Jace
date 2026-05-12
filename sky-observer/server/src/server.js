require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.disable('etag');
app.use(cors());
app.use(express.json());

app.use((_req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/usno', require('./routes/usno.routes'));
app.use('/api/locations', require('./routes/location.routes'));
app.use('/api/lookups', require('./routes/lookup.routes'));

app.use((err, _req, res, _next) => {
  const status = err?.response?.status || 500;
  const message = err?.response?.data?.message || err?.message || 'Internal server error';
  res.status(status).json({ ok: false, message });
});

async function start() {
  const port = process.env.PORT || 3000;
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing in .env');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');

  app.listen(port, () => console.log(`API running on ${port}`));
}

start().catch((err) => {
  console.error('Startup failed:', err.message);
  process.exit(1);
});
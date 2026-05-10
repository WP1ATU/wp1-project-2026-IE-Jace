require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.disable('etag'); // prevent conditional 304s for API responses
app.use(cors());
app.use(express.json());

// force no-cache headers on every response
app.use((_req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/usno', require('./routes/usno.routes'));

app.use((err, _req, res, _next) => {
  const status = err?.response?.status || 500;
  const message = err?.response?.data?.message || err?.message || 'Internal server error';
  res.status(status).json({ ok: false, message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on ${port}`));
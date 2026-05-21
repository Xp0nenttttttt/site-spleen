// Simple CORS proxy for AREDL API
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.get('/api/aredl/*', async (req, res) => {
  const targetUrl = 'https://api.aredl.net' + req.originalUrl.replace('/api', '');
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Node',
        'Accept': 'application/json',
      },
    });
    const data = await response.text();
    res.status(response.status).type(response.headers.get('content-type')).send(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`CORS proxy server running on port ${PORT}`);
});

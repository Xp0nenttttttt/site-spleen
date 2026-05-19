const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/players/search/:name', async (req, res) => {
  const { name } = req.params;
  const apiUrl = `https://api.aredl.net/v2/players/search/${encodeURIComponent(name)}`;
  console.log('Requête reçue sur /api/players/search/:name avec paramètre name =', req.params.name);
  try {
    const response = await fetch(apiUrl);
    const text = await response.text();
    console.log('Status:', response.status, 'Body:', text);
    const data = JSON.parse(text);
    res.json(data);
  } catch (err) {
    console.error('Erreur proxy /api/players/search:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.get('/api/players/:id', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://api.aredl.net/v2/players/${encodeURIComponent(id)}`;
  console.log('Requête reçue sur /api/players/:id avec paramètre id =', req.params.id);
  try {
    const response = await fetch(apiUrl);
    const text = await response.text();
    console.log('Status:', response.status, 'Body:', text);
    const data = JSON.parse(text);
    res.json(data);
  } catch (err) {
    console.error('Erreur proxy /api/players/:id:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
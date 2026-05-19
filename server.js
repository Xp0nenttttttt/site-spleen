const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/players/search/:name', async (req, res) => {
  const { name } = req.params;
  const apiUrl = `https://api.aredl.net/v2/players/search/${encodeURIComponent(name)}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.get('/api/players/:id', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://api.aredl.net/v2/players/${encodeURIComponent(id)}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
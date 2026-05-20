const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/players/search/:name', async (req, res) => {
  const { name } = req.params;
  const apiUrl = `https://api.aredl.net/v2/users/search/${encodeURIComponent(name)}`;
  console.log('Requête reçue sur /api/players/search/:name avec paramètre name =', req.params.name);
  try {
    const response = await fetch(apiUrl, {
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VyX2lkXCI6XCIzN2MwMGNmNi03ODMwLTQwMGMtOWRiNC01ODI3MGQ5ZmJiOTdcIixcImlzX2FwaV9rZXlcIjp0cnVlfSIsImlhdCI6MTc3OTIyNDAxMSwiZXhwIjoxODEwNzYwMDExLCJ0b2tlbl90eXBlIjoiYWNjZXNzIn0.tgjuZYUtMCE2ts-du_JROW4-srehFnyLcQKBwq2QtFI'
  }
});
    const text = await response.text();
    console.log('Status:', response.status, 'Body:', text);
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      console.error('Erreur de parsing JSON /api/players/search:', jsonErr);
      return res.status(500).json({ error: 'Réponse API non valide (pas du JSON).' });
    }
    res.json(data);
  } catch (err) {
    console.error('Erreur proxy /api/players/search:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.get('/api/players/:id', async (req, res) => {
  const { id } = req.params;
  const apiUrl = `https://api.aredl.net/v2/users/${encodeURIComponent(id)}`;
  console.log('Requête reçue sur /api/players/:id avec paramètre id =', req.params.id);
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJ1c2VyX2lkXCI6XCIzN2MwMGNmNi03ODMwLTQwMGMtOWRiNC01ODI3MGQ5ZmJiOTdcIixcImlzX2FwaV9rZXlcIjp0cnVlfSIsImlhdCI6MTc3OTIyNDAxMSwiZXhwIjoxODEwNzYwMDExLCJ0b2tlbl90eXBlIjoiYWNjZXNzIn0.tgjuZYUtMCE2ts-du_JROW4-srehFnyLcQKBwq2QtFI'
      }
    });
    const text = await response.text();
    console.log('Status:', response.status, 'Body:', text);
    let data;
    try {
      data = JSON.parse(text);
    } catch (jsonErr) {
      console.error('Erreur de parsing JSON /api/players/:id:', jsonErr);
      return res.status(500).json({ error: 'Réponse API non valide (pas du JSON).' });
    }
    res.json(data);
  } catch (err) {
    console.error('Erreur proxy /api/players/:id:', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('Proxy server is running');
});

// Proxy route
app.post('/api/fetch-timeline', async (req, res) => {
  let body = req.body;
    if (typeof body === 'string') {
        body = new URLSearchParams(body);
    } else {
        body = new URLSearchParams(Object.entries(body));
    }   

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const response = await fetch('https://wooble.io/api/portfolio/fetch_timeline.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      const data = await response.text();
      console.log('Response from Wooble:', data);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      res.send(data);
    } catch (err) {
      console.error(err);
      console.error(err.status, err.statusText);
      res.status(500).send(res.statusMessage || 'Internal Server Error');
    }
  });
});

app.listen(3001, () => {
  console.log('🚀 Proxy running at http://localhost:3001');
});

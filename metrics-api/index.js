// index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/metrics', async (req, res) => {
  const metrics = req.body.metrics;

  for (const metric of metrics) {
    await axios.post('http://localhost:9090/api/v1/write', {
      timestamp: metric.timestamp,
      value: metric.value,
      metric: { __name__: metric.type, job: req.body.application }
    });
  }

  res.status(200).send('Metrics received');
});

app.get('/status', (req, res) => {
  res.status(200).send('API is running');
});

app.listen(PORT, () => {
  console.log(`Metrics API running on http://localhost:${PORT}`);
});


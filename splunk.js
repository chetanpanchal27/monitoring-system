const SPLUNK_URL = 'http://localhost:8088/services/collector';
const SPLUNK_TOKEN = 'f28b8714-c267-4281-b3a3-899d8b53f701';

app.post('/metrics', async (req, res) => {
  const metrics = req.body.metrics;

  for (const metric of metrics) {
    await axios.post(, {
      event: metric,
      sourcetype: '_json',
      index: 'metrics',
      fields: { application: req.body.application },
    }, {
      headers: { Authorization: `Splunk ${SPLUNK_TOKEN}` },
    });
  }

  res.status(200).send('Metrics received');
});


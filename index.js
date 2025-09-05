require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

// health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API running', time: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

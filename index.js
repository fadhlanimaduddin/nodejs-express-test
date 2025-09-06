require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'API running', time: new Date().toISOString() });
});

const personRoutes = require('./routes/personRoutes');
app.use('/api/persons', personRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

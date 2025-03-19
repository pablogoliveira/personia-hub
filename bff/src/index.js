
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const personRoutes = require('./routes/personRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pessoas', personRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Person Registration BFF');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('BFF Error:', err);
  
  // Handle backend API errors
  if (err.status && err.error && err.message) {
    return res.status(err.status).json(err);
  }
  
  // Default error
  res.status(500).json({
    status: 500,
    error: 'Internal Server Error',
    message: 'Ocorreu um erro no servidor',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`BFF is running on port ${PORT}`);
});

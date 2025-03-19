
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./infrastructure/database/models');
const personRoutes = require('./infrastructure/http/routes/personRoutes');
const errorHandler = require('./infrastructure/http/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pessoas', personRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Person Registration API');
});

// Error handler
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();

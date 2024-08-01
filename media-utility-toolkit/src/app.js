const express = require('express');
const bodyParser = require('body-parser');
const youtubeRoutes = require('./routes/youtubeRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:4200', // Your Angular app's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Length,Content-Disposition' // Expose Content-Length and Content-Disposition headers
  }));

app.use(bodyParser.json());
app.use('/api/youtube', youtubeRoutes);



// Error handling middleware
app.use(errorHandler);

module.exports = app;

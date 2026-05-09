const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');

// Middleware
app.use(express.json());

// Routes
app.use('/', schoolRoutes);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

module.exports = app;

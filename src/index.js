const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const environment = require('./config/environment');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
require('./config/database');

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Start server
// app.listen(environment.port, () => {
//     console.log(`Server started on port ${environment.port}`);
//     if (environment.nodeEnv === 'test') {
//         console.log(`Running in ${environment.nodeEnv} mode`);
//     } else {
//         console.log(`Running in ${environment.nodeEnv} mode`);
//     }
// });

module.exports = app;
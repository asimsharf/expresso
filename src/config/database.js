const mongoose = require('mongoose');
// const environment = require('./config/environment');


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/my_database';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});
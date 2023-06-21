const mongoose = require('mongoose');
const environment = require('./environment');

mongoose.connect(environment.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', function() {
    console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

db.on('error', function(error) {
    console.log(`Database error\n${error}`);
});

module.exports = mongoose;

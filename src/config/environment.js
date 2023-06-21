require('dotenv').config();

const environment = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost/my_database',
    jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
};

module.exports = environment;
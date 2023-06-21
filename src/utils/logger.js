const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

const logger = (req, res, next) => {
    const date = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const userAgent = req.headers['user-agent'];

    const log = `[${date}] ${method} ${url} ${userAgent}\n`;
    accessLogStream.write(log);

    next();
};

module.exports = logger;
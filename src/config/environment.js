require('dotenv').config();

const environment = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'mongodb://localhost/expresso2',
    jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
    jwtExpiration: process.env.JWT_EXPIRATION || '1d',
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
    jwtCookieExpiration: process.env.JWT_COOKIE_EXPIRATION || 7,
    jwtCookieName: process.env.JWT_COOKIE_NAME || 'jwt',
    jwtCookieSecure: process.env.JWT_COOKIE_SECURE || false,
    jwtCookieHttpOnly: process.env.JWT_COOKIE_HTTP_ONLY || true,
    jwtCookieSameSite: process.env.JWT_COOKIE_SAME_SITE || 'strict',
    jwtCookieDomain: process.env.JWT_COOKIE_DOMAIN || 'localhost',
    jwtCookiePath: process.env.JWT_COOKIE_PATH || '/',
    jwtCookieSigned: process.env.JWT_COOKIE_SIGNED || true,
    jwtCookieOverwrite: process.env.JWT_COOKIE_OVERWRITE || true,
    jwtCookieMaxAge: process.env.JWT_COOKIE_MAX_AGE || 86400000,
    jwtCookieExpires: process.env.JWT_COOKIE_EXPIRES || new Date(Date.now() + 86400000),
};

module.exports = environment;

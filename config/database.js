/**
 * All environment related database client (ORM)
 * configuration will be configured here
 *
 * IMPORTANT!
 * NODE_ENV must be define in your environment. Because the keys of the objects
 * below are used on "model/index.js" for matching process.env.NODE_ENV.
 * When NODE_ENV undefined, "development" will be used.
 */

require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_USER_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};

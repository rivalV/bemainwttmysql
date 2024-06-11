const { Sequelize } = require('sequelize');
const dbConfig = require('./database');

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

// Ekstraksi konfigurasi
const database = config.database;
const username = config.username;
const password = config.password;

// Buat objek Sequelize dengan konfigurasi yang sesuai
const sequelize = new Sequelize(database, username, password, {
  host: config.host,
  dialect: config.dialect,
});

// Uji koneksi ke database
sequelize
  .authenticate()
  .then(() => {
    console.log('Koneksi database berhasil.');
  })
  .catch((error) => {
    console.error('Tidak dapat terhubung ke database:', error);
  });

const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
require('dotenv').config();

const app = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(port, () =>
  console.log(`App running on http://${hostname}:${port}`),
);

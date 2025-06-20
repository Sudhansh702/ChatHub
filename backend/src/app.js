

const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('API is working');
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


module.exports = app;

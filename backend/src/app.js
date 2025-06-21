
const express = require('express');
const cookieParser = require('cookie-parser')

const app = express();

require('dotenv').config();

// Database connection
const connectDb = require('./utils/connectDb');
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API is working');
});

// Authentication routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/connections', require('./routes/connections'));
app.use('/api/messages', require('./routes/messages.js'));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

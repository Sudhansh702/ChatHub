const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {app, server, io} = require('./utils/socket'); 

const path = require('path');
const __dirname = path.resolve();


require('dotenv').config();

// Database connection
const connectDb = require('./utils/connectDb');
connectDb();

app.use(express.json({ limit: '10mb' })); // or higher if needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('API is working');
});

// Authentication routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/connections', require('./routes/connections'));
app.use('/api/messages', require('./routes/messages.js'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend','dist','index.html'));
  });
}

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

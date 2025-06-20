const app = require('./app');
const sequelize = require('./connectDb');
const User = require('./models/User');
const Message = require('./models/Messages');

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('DB connection failed:', error);
  }
})(); 
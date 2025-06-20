const { DataTypes } = require('sequelize');
const sequelize = require('../connectDb'); 

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  profilePicUrl: { type: DataTypes.STRING }
});

module.exports = User;

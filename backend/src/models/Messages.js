const { DataTypes } = require('sequelize');
const sequelize = require('../connectDb');

const Message = sequelize.define('Message', {
  content: { type: DataTypes.TEXT, allowNull: false },
  senderId: { type: DataTypes.INTEGER, allowNull: false },
  receiverId: { type: DataTypes.INTEGER, allowNull: false },
  readStatus: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Message;

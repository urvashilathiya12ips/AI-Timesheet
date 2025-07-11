const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Adjust path as per your project

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
   report_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
   htmlReport: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'report',
  timestamps: false, 
});

module.exports = Report;

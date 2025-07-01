const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Adjust path as per your project

const AccountDetails = sequelize.define('AccountDetails', {
  account_details_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'tbl_account_details',
  timestamps: false, 
});


module.exports = AccountDetails;

const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const ProjectTimesheet = sequelize.define('project_timesheets', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  time: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  entry_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'project_timesheets',
  timestamps: false, 
  paranoid: true,    
  underscored: true, 
});



module.exports = ProjectTimesheet;

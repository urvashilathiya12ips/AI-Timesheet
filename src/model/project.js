// models/project.js



const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection'); // Adjust path as per your project

const projects = sequelize.define('projects', {
 id: {
      type: DataTypes.INTEGER, // or DataTypes.UUID if using UUIDs
      autoIncrement: true,
      primaryKey: true
    },
    pm_user_id: {
      type: DataTypes.INTEGER
    },
    client_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    slack_config_enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    estimated_time: {
      type: DataTypes.FLOAT
    },
    status: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    notes: {
      type: DataTypes.TEXT
    },
    delivery_date: {
      type: DataTypes.DATE
    },
    start_date: {
      type: DataTypes.DATE
    },
    completed_date: {
      type: DataTypes.DATE
    },
    reopen_request: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sta_id: {
      type: DataTypes.INTEGER
    },
    technology: {
      type: DataTypes.STRING
    },
    show_qa_tab: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    pcd: {
      type: DataTypes.STRING 
    },
    lms_lead: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'projects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true, 
    deletedAt: 'deleted_at'
  });



module.exports = projects;


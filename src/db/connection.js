const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('timesheet analysis', 'root', 'ips12345', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to MySQL via Sequelize.');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });

module.exports = sequelize;




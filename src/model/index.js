// Central model loader and association setup
const Project = require('./project');
const AccountDetails = require('./accountDetails');
const ProjectTimesheet = require('./projectTimesheet');
const Report = require('./report');

ProjectTimesheet.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
ProjectTimesheet.belongsTo(AccountDetails, { foreignKey: 'user_id', as: 'user' });
Report.belongsTo(AccountDetails, { foreignKey: 'user_id', targetKey: 'user_id', as: 'user' });
AccountDetails.hasMany(Report, { foreignKey: 'user_id', sourceKey: 'user_id', as: 'reports' });



module.exports = {
  Project,
  AccountDetails,
  ProjectTimesheet,
    Report,

};

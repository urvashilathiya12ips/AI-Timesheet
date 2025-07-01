const { Op } = require('sequelize');
const { AccountDetails, ProjectTimesheet, Project , Report } = require('../model');
const { generateReport } = require('../helper/response');
const _ = require('lodash');


exports.getUserList = async (req) => {
    try {
        const search = req?.query?.search || '';
        const allUsers = await AccountDetails.findAll({
            where: search ? {
                fullname: {
                [Op.iLike]: `%${search}%`, 
                },
            }
            : undefined,
        order: [['fullname', 'ASC']],
        });

        return {
            success: 1,
            statusCode: 200,
            message: 'Logs fetched successfully',
            data: allUsers
        };
    } catch (error) {
        return {
            success: 0,
            statusCode: 500,
            message: 'Failed to fetch logs',
            error: error.message
        };
    }
};

exports.generateReport = async (req) => {
    try {
        const { userIds, date } = req.body;

        if (!Array.isArray(userIds) || !date) {
        return res.status(400).json({
            success: 0,
            message: 'user_id and entry_date are required',
        });
        }
        const timesheets = await ProjectTimesheet.findAll({
            where: {
                user_id: { [Op.in]: userIds },
                entry_date : date,
            },
            attributes: ['description','time','entry_date','user_id'],
            include: [
                {
                    model: AccountDetails,
                    as: 'user',
                    attributes: ['fullname'] 
                },
                {
                    model: Project,
                    as: 'project',
                    attributes: ['name']
                }
                
            ]
        });
        if(timesheets.length == 0){
             return {
                success: 0,
                statusCode: 400,
                message: 'Data is not available',
            };
        }
        const groupedByUser = _.groupBy(timesheets, 'user_id');
        for (const [user_id, entries] of Object.entries(groupedByUser)) {
            const existingReport = await Report.findOne({
                where: {
                    user_id: user_id,
                    report_date: {
                        [Op.between]: [
                            new Date(`${date}T00:00:00.000Z`),
                            new Date(`${date}T23:59:59.999Z`),
                        ],
                        },                
                    },
            });
            if (existingReport) {
                continue; 
            }
            const response = await generateReport(entries);
            await Report.create({
                user_id: user_id,
                htmlReport: response,
                report_date: date,
            }); 
        }
        
        return {
            success: 1,
            statusCode: 200,
            message: 'Report Generated successfully',
        };
    } catch (error) {
        return {
            success: 0,
            statusCode: 500,
            message: 'Failed to fetch logs',
            error: error.message
        };
    }
};

exports.getReport = async () => {
    try {
        const allReport = await Report.findAll({
            include: [
                {
                    model: AccountDetails,
                    as: 'user',
                    attributes: ['fullname',], 
                }
            ],
            order: [['created_at', 'DESC']], 

        });
        const transformedReports = allReport.map(report => {
            const { user, ...rest } = report.get({ plain: true });
            return {
                ...rest,
                user_name: user?.fullname || null
            };
        });


        return {
            success: 1,
            statusCode: 200,
            message: 'Logs fetched successfully',
            data: transformedReports
        };
    } catch (error) {
        return {
            success: 0,
            statusCode: 500,
            message: 'Failed to fetch logs',
            error: error.message
        };
    }
};


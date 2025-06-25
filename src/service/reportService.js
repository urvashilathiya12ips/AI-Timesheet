const Report = require("../model/report");

exports.reportList = async () => {
     try {
        const reports = await Report.find().sort({ createdAt: -1 });
        return {
            success: 1,
            statusCode: 200,
            message: 'Tasks fetched successfully',
            data: reports
        };
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return {
            success: 0,
            statusCode: 500,
            message: 'Failed to fetch tasks',
            error: error.message
        };
    }
       
}
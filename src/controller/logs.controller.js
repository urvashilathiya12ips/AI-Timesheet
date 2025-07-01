const { responseData, responseMessage } = require('../helper/response');
const service = require('../service/index');


exports.getUserList = async(req, res) => {
    try {
        const result = await service.logsService.getUserList();
        if (!result)
            return responseData({
                res,
                statusCode: 400,
                success: 0,
                message: responseMessage('error', 'fetching')
            });
        responseData({ res, ...result });
    } catch (error) {
        console.log('error', error)
        responseData({
            res,
            statusCode: 500,
            success: 0,
            message: error.message
        });
    }
}

exports.generateReport = async(req, res) => {
    try {
        const result = await service.logsService.generateReport(req);
        if (!result)
            return responseData({
                res,
                statusCode: 400,
                success: 0,
                message: responseMessage('error', 'fetching')
            });
        responseData({ res, ...result });
    } catch (error) {
        console.log('error', error)
        responseData({
            res,
            statusCode: 500,
            success: 0,
            message: error.message
        });
    }
}

exports.getReport = async(req, res) => {
    try {
        const result = await service.logsService.getReport();
        if (!result)
            return responseData({
                res,
                statusCode: 400,
                success: 0,
                message: responseMessage('error', 'fetching')
            });
        responseData({ res, ...result });
    } catch (error) {
        console.log('error', error)
        responseData({
            res,
            statusCode: 500,
            success: 0,
            message: error.message
        });
    }
}

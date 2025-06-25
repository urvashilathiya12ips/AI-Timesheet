const { responseData, responseMessage } = require('../helper/response');
const service = require('../service/index');

exports.createLog = async (req, res) => {
    try {
        const result = await service.logsService.createLog(req);
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
};

exports.getLogs = async (req, res) => {
    try {
        const result = await service.logsService.getLogs();
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
};

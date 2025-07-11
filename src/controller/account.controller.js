const { responseData, responseMessage } = require('../helper/response');
const service = require('../service/index');

//Add
exports.analyzer = async (req, res) => {
    try {
        const result = await service.accountService.analyzer(req.body);
        if (!result)
            return responseData({
                res,
                statusCode: 400,
                success: 0,
                message: responseMessage('error', 'creating')
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

exports.project = async (req, res) => {
    try {
        const result = await service.accountService.project(req.body);
        if (!result)
            return responseData({
                res,
                statusCode: 400,
                success: 0,
                message: responseMessage('error', 'creating')
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

exports.projectList = async (req, res) => {
    try {
        const result = await service.accountService.projectList();
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

exports.removeProject = async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const result = await service.accountService.removeProject(projectId);

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





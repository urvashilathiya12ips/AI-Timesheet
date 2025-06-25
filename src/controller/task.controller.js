const { responseData, responseMessage } = require('../helper/response');
const service = require('../service/index');

exports.taskList = async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const result = await service.taskService.taskList(projectId);
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

exports.addTask = async (req, res) => {
    try {
        const result = await service.taskService.addTask(req);
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

exports.removeTask = async (req, res) => {
    const taskId = req.params.taskId;
    try {
        const result = await service.taskService.removeTask(taskId);
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

exports.editTask = async (req, res) => {
    try {
        const result = await service.taskService.editTask(req);
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





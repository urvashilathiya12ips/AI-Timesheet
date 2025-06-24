const Task = require("../model/task.js");

exports.taskList = async (projectId) => {
     try {
        const tasks = await Task.find({ projectId });
        return {
            success: 1,
            statusCode: 200,
            message: 'Tasks fetched successfully',
            data: tasks
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

exports.addTask = async (req) => {
     try {
        const { tasks } = req.body;
        const task = await Task.insertMany(tasks);
        return {
            success: 1,
            statusCode: 200,
            message: 'Tasks Added successfully',
            data: task
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


exports.removeTask = async (taskId) => {
     try {
        const result = await Task.findByIdAndDelete(taskId);
        if (!result) {
            return {
                success: 0,
                statusCode: 404,
                message: 'Task not found'
            };
        }
        return {
            success: 1,
            statusCode: 200,
            message: 'Task delete successfully'
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

exports.editTask = async (req) => {
    try {
        const taskId = req.params.taskId;
        const { taskName, hours } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { taskName, hours },
            { new: true }
        );
        if (!updatedTask) {
            return {
                success: 0,
                statusCode: 404,
                message: 'Task not found'
            };
        }
        return {
            success: 1,
            statusCode: 200,
            message: 'Task updated successfully',
            data: updatedTask
        };
    } catch (error) {
        console.error('Error updating task:', error);
        return {
            success: 0,
            statusCode: 500,
            message: 'Failed to update task',
            error: error.message
        };
    }
};
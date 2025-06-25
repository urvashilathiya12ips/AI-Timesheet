const Task = require("../model/task.js");
const Project = require("../model/project.js");

exports.taskList = async (projectName) => {
     try {
            const projects = await Project.find({ name : projectName });
           const result = await Promise.all(
            projects.map(async (project) => {
              const tasks = await Task.find({ projectId: project._id });
            
              return {
                _id: project._id,
                name: project.name,
                startDate: project.startDate,
                endDate: project.endDate,
                tasks: tasks.map(task => ({
                  _id: task._id,
                  taskName: task.taskName,
                  hours: task.hours
                }))
              };
            })
            );
            return {
                success: 1,
                statusCode: 200,
                message: 'Tasks fetched successfully',
                data: result
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
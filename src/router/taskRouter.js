const express = require('express');
const router = new express.Router();
const Controller = require('../controller');

router.get('/taskList', Controller.taskController.taskList);

router.post('/task/bulk', Controller.taskController.addTask);

router.put('/task/:taskId', Controller.taskController.editTask);

router.delete('/task/:taskId',Controller.taskController.removeTask)



module.exports = router;

const express = require('express');
const router = new express.Router();
const Controller = require('../controller/index');

router.post('/analyzer', Controller.accountController.analyzer);

router.post('/project', Controller.accountController.project);

router.get('/projectList', Controller.accountController.projectList);

router.delete('/project/:projectId',Controller.accountController.removeProject)


module.exports = router;

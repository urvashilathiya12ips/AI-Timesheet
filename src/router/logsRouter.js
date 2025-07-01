const express = require('express');
const router = express.Router();
const Controller = require('../controller');

router.get('/user',Controller.logsController.getUserList)

router.post('/report',Controller.logsController.generateReport)

router.get('/report',Controller.logsController.getReport)



module.exports = router;
const express = require('express');
const router = express.Router();
const Controller = require('../controller');

router.post('/logs', Controller.logsController.createLog);

router.get('/logs', Controller.logsController.getLogs);

module.exports = router;
const express = require('express');
const router = new express.Router();
const Controller = require('../controller');

router.get('/reportList', Controller.reportController.reportList);

module.exports = router;

const express = require('express');
const router = express.Router();

const accountRoutes = require('./accountRouter');
const taskRoutes = require('./taskRouter');
const reportRoutes = require('./reportRouter');
const logsRoutes = require('./logsRouter');



router.use(accountRoutes);
router.use(taskRoutes);
router.use(reportRoutes);
router.use(logsRoutes);



module.exports = router;

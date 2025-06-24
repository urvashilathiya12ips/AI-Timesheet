const express = require('express');
const router = express.Router();

const accountRoutes = require('./accountRouter');
const taskRoutes = require('./taskRouter');
const reportRoutes = require('./reportRouter');


router.use(accountRoutes);
router.use(taskRoutes);
router.use(reportRoutes);


module.exports = router;

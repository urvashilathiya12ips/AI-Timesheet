const express = require('express');
const router = express.Router();


const logsRoutes = require('./logsRouter');


router.use(logsRoutes);



module.exports = router;

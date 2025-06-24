const express = require('express');
const router = express.Router();

const accountRoutes = require('./accountRouter');


router.use(accountRoutes);
module.exports = router;

// import express routers
const router = require('express').Router();

// declare routes to api folder and homeroutes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

// use declared variables
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// export router
module.exports = router;
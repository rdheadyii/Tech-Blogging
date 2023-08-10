// import the routes
const router = require('express').Router();
const blogRoutes = require('./blogRoutes.js');
const commentRoutes = require('./commentRoutes.js');
const userRoutes = require('./userRoutes.js');

// use the routes
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

// export routes
module.exports = router;
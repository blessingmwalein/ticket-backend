const router = require('express').Router();


const adminRoutes = require('./admin');




router.use(adminRoutes)


module.exports = router;
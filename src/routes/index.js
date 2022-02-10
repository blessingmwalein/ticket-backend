const router = require('express').Router();

const authRoutes = require('./auth');
const customerRoutes = require('./customer');
const adminRoutes = require('./admin');



router.use(authRoutes);
router.use(customerRoutes)
router.use(adminRoutes)


module.exports = router;
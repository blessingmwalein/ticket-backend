const router = require('express').Router();

const authRoutes = require('./auth');
const customerRoutes = require('./customer');
const adminRoutes = require('./admin');
const eventRoutes = require('./event');
const venueRoutes = require('./venue');



router.use(authRoutes);
router.use(customerRoutes)
router.use(adminRoutes)
router.use(eventRoutes)
router.use(venueRoutes)


module.exports = router;
const router = require("express").Router();

const customerController = require('../controllers/customer');

const passport = require("passport");

router.get('/customer/type',passport.authenticate('jwt', { session: false }), customerController.getCustomerTypes)
router.get('/customer/type/:id',passport.authenticate('jwt', { session: false }), customerController.getCustomerType)
router.post('/customer/type/create',passport.authenticate('jwt', { session: false }), customerController.createCustomerTypes)
router.post('/customer/type/update/:id',passport.authenticate('jwt', { session: false }), customerController.updateCustomerType)
router.delete('/customer/type/delete/:id',passport.authenticate('jwt', { session: false }), customerController.deleteCustomerType)

router.post('/customer/create',passport.authenticate('jwt', { session: false }), customerController.createCustomer)
router.post('/customer/update/:id',passport.authenticate('jwt', { session: false }), customerController.updateCustomer)
router.get('/customer',passport.authenticate('jwt', { session: false }), customerController.getAllCustomers)
router.get('/customer/:id',passport.authenticate('jwt', { session: false }), customerController.getCustomer)


module.exports = router;
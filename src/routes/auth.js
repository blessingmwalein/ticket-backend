const router = require("express").Router();
const registerController = require('../controllers/auth/register');
const loginController = require('../controllers/auth/login');
const passport = require("passport");


router.post('/user/register', registerController.registerUser);
router.post('/customer/login', loginController.loginCustomer);
router.post('/admin/login', loginController.loginAdmin);


router.get('/customer/check-login', passport.authenticate('jwt', { session: false }), loginController.getUser);

// router.get('/admin/login', re)
module.exports = router;
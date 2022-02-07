const router = require("express").Router();

const adminController = require('../controllers/admin');


const passport = require("passport");

router.get('/admin/role', adminController.getAdminRoles)

module.exports = router;
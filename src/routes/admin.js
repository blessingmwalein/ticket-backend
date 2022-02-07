const router = require("express").Router();

const adminController = require('../controllers/admin');


const passport = require("passport");

router.get('/admin/role',passport.authenticate('jwt', { session: false }), adminController.getAdminRoles)
router.get('/admin/role/:id',passport.authenticate('jwt', { session: false }), adminController.getAdminRole)
router.post('/admin/role/create',passport.authenticate('jwt', { session: false }), adminController.createAdminRoles)
router.post('/admin/role/update/:id',passport.authenticate('jwt', { session: false }), adminController.updateAdminRole)
router.delete('/admin/role/delete/:id',passport.authenticate('jwt', { session: false }), adminController.deleteAdminRole)

router.post('/admin/create',passport.authenticate('jwt', { session: false }), adminController.createAdmin)
router.post('/admin/update/:id',passport.authenticate('jwt', { session: false }), adminController.updateAdmin)
router.get('/admin',passport.authenticate('jwt', { session: false }), adminController.getAllAdmins)
router.get('/admin/:id',passport.authenticate('jwt', { session: false }), adminController.getAdmin)


module.exports = router;
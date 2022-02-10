const router = require("express").Router();

const eventCategoryController = require('../controllers/event_category');

const passport = require("passport");


router.post('/event/category/create', passport.authenticate('jwt', { session: false }), eventCategoryController.createEventCategory)
router.post('/event/category/update/:id', passport.authenticate('jwt', { session: false }), eventCategoryController.updateEventCategory)
router.get('/event/category', passport.authenticate('jwt', { session: false }), eventCategoryController.getEventCategories)
router.get('/event/category/:id', passport.authenticate('jwt', { session: false }), customerController.getCustomer)


module.exports = router;
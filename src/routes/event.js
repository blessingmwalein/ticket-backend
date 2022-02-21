const router = require("express").Router();

const eventCategoryController = require('../controllers/event_category');
const event = require('../controllers/event');

const passport = require("passport");


router.post('/event/category/create', passport.authenticate('jwt', { session: false }), eventCategoryController.createEventCategory)
router.post('/event/category/update/:id', passport.authenticate('jwt', { session: false }), eventCategoryController.updateEventCategory)
router.get('/event/category', passport.authenticate('jwt', { session: false }), eventCategoryController.getEventCategories)
router.get('/event/category/:id', passport.authenticate('jwt', { session: false }), eventCategoryController.getEventCategory)


router.post('/event/create', passport.authenticate('jwt', { session: false }), event.createEvent)
router.post('/event/update/:id', passport.authenticate('jwt', { session: false }), event.updateEvent)
router.get('/event', passport.authenticate('jwt', { session: false }), event.getEvents)
router.get('/event/:id', passport.authenticate('jwt', { session: false }), event.getEvent)
router.delete('/event/:id', passport.authenticate('jwt', { session: false }), event.deleteEvent)


module.exports = router;
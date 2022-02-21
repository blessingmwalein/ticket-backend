const router = require("express").Router();

const venueController = require('../controllers/venue');

const passport = require("passport");


router.post('/venue/create', passport.authenticate('jwt', { session: false }), venueController.createVenue)
router.post('/venue/update/:id', passport.authenticate('jwt', { session: false }), venueController.updateVenue)
router.get('/venue', passport.authenticate('jwt', { session: false }), venueController.getVenues)
router.get('/venue/:id', passport.authenticate('jwt', { session: false }), venueController.getVenue)

router.post('/event-venue/create', passport.authenticate('jwt', { session: false }), venueController.createEventVenue)
router.post('/event-venue/update/:id', passport.authenticate('jwt', { session: false }), venueController.updateEventVenue)
router.get('/event-venue', passport.authenticate('jwt', { session: false }), venueController.getEventVenues)
router.get('/event-venue/:id', passport.authenticate('jwt', { session: false }), venueController.getEventVenue)


module.exports = router;
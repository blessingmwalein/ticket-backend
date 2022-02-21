
const EventVenue = require('../models/event_venue');
const Venue = require('../models/venue');
const response = require('../services/utils/response');


exports.getVenues = async (req, res) => {

    const venues = await Venue.findAll().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (venues) response.successResponse(res, '', 200, venues);

}

exports.createVenue = async (req, res) => {
    var { name, image, address, contact, longitude, latitude } = req.body;

    const newVenue = new Venue({ name, image, address, contact, longitude, latitude });
    const savedVenue = await newVenue.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedVenue) response.successResponse(res, ['Successfully Added'], 200, newVenue);

}

exports.updateVenue = async (req, res) => {
    const { name, image, address, contact, longitude, latitude } = req.body;

    const updatedVenue = await Venue.update(
        { name, image, address, contact, longitude, latitude },
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (updatedVenue) response.successResponse(res, ['Venue Updated'], 200, updatedVenue);
}

exports.deleteVenue = async (req, res) => {

    const deletedVenue = await Venue.destroy(
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (deletedVenue) response.successResponse(res, ['Venue Deleted'], 200, deletedVenue);
}

exports.getVenue = async (req, res) => {

    const venue = await Venue.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );
    if (venue) {
        return response.successResponse(res, '', 400, venue);
    }
}


exports.getEventVenues = async (req, res) => {

    const eventVenues = await EventVenue.findAll().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (eventVenues) response.successResponse(res, '', 200, eventVenues);

}

exports.createEventVenue = async (req, res) => {
    var { event_id, venue_id } = req.body;

    const newEventVenue = new EventVenue({ event_id, venue_id });
    const savedEventVenue = await newEventVenue.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedEventVenue) response.successResponse(res, ['Successfully Added'], 200, newEventVenue);
}

exports.updateEventVenue = async (req, res) => {
    const { event_id, venue_id } = req.body;

    const updatedEventVenue = await EventVenue.update(
        { event_id, venue_id },
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (updatedEventVenue) response.successResponse(res, ['Event Venue Updated'], 200, updatedEventVenue);
}

exports.deleteEventVenue = async (req, res) => {
    const deletedEventVenue = await EventVenue.destroy(
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (deletedEventVenue) response.successResponse(res, ['Event Venue Deleted'], 200, deletedEventVenue);
}

exports.getEventVenue = async (req, res) => {
    const eventVenue = await EventVenue.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );
    if (eventVenue) {
        return response.successResponse(res, '', 400, eventVenue);
    }
    
}

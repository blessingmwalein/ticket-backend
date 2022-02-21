
const Event = require('../models/event');
const response = require('../services/utils/response');


exports.getEvents = async (req, res) => {

    const events = await Event.findAll().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (events) response.successResponse(res, '', 200, events);

}

exports.createEvent = async (req, res) => {
    var { title, event_category_id, desc, event_date_time, payment_deadline, prices, images } = req.body;
 
    const newEvent = new Event({ event_category_id, title, desc, event_date_time, payment_deadline, prices, images });
    const savedEvent = await newEvent.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedEvent) response.successResponse(res, ['Successfully Added'], 200, newEvent);

}

exports.updateEvent = async (req, res) => {
    const { event_category_id, title, desc, event_date_time, payment_deadline, prices, images } = req.body;

    const updatedEvent = await Event.update(
        { event_category_id, title, desc, event_date_time, payment_deadline, prices, images},
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (updatedEvent) response.successResponse(res, ['Event Updated'], 200, updatedEvent);
}

exports.deleteEvent = async (req, res) => {
    

    const deletedEvent = await Event.destroy(
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (deletedEvent) response.successResponse(res, ['Event Deleted'], 200, deletedEvent);
}

exports.getEvent = async (req, res) => {

    const event = await Event.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );
    if (event) {
        return response.successResponse(res, '', 400, event);
    }
}


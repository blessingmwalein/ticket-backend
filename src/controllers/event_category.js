
const EventCategory = require('../models/event_category');
const response = require('../services/utils/response');


exports.getEventCategories = async (req, res) => {

    const eventCateries = await EventCategory.findAll().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (eventCateries) response.successResponse(res, '', 200, eventCateries);

}

exports.createEventCategory = async (req, res) => {
    const { name, icon } = req.body;

    const newEventCategory = new EventCategory({ name, icon });
    const savedEventCategory = await newEventCategory.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedEventCategory) response.successResponse(res, ['Successfully Added'], 200, newEventCategory);

}

exports.updateEventCategory = async (req, res) => {
    const { name } = req.body;

    const updatedEventCategory = await EventCategory.update(
        { name: name },
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (updatedEventCategory) response.successResponse(res, ['Event Category Updated'], 200, updatedCustomerType);
}

exports.deleteEventCategory = async (req, res) => {
    const { name } = req.body;

    const deletedEventCategory = await EventCategory.destroy(
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (deletedEventCategory) response.successResponse(res, ['Event Category Deleted'], 200, deletedEventCategory);
}

exports.getEventCategory = async (req, res) => {

    const eventCategory = await EventCategory.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );
    if (eventCategory) {
        return response.successResponse(res, '', 400, { eventCategory: eventCategory });
    }
}


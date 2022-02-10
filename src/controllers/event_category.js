
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
    const { name, image } = req.body;

    const newEventCategory = new EventCategory({ name, image });
    const savedCustomerType = await newEventCategory.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedCustomerType) response.successResponse(res, ['Successfully Added'], 200, newEventCategory);

}

exports.updateEventCategory = async (req, res) => {
    const { name } = req.body;

    const updatedCustomerType = await CustomerType.update(
        { name: name },
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (updatedCustomerType) response.successResponse(res, ['Customer Type Updated'], 200, updatedCustomerType);
}

exports.deleteEventCategory = async (req, res) => {
    const { name } = req.body;

    const deletedCustomerType = await CustomerType.destroy(
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (deletedCustomerType) response.successResponse(res, ['Customer Type Deleted'], 200, deletedCustomerType);
}

exports.getEventCategory = async (req, res) => {

    const customer = await Customer.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );

    if (customer) {
        return response.successResponse(res, '', 400, { customer: customer, user: await User.findOne({ where: { id: customer.user_id } }) });
    }
}


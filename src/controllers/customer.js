const Customer = require('../models/customer');
const User = require('../models/user');
const CustomerType = require('../models/customer_type');
const response = require('../services/utils/response');


exports.getCustomerTypes = async (req, res) => {

    const customerTypes = await CustomerType.findAll().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (customerTypes) response.successResponse(res, '', 200, customerTypes);

}

exports.getCustomerType = async (req, res) => {

    const customerType = await CustomerType.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );
    if (customerType) {
        return response.successResponse(res, '', 400, customerType);
    }
}
exports.createCustomerTypes = async (req, res) => {
    const { name } = req.body;

    const newCustomerType = new CustomerType({ name });
    const savedCustomerType = await newCustomerType.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, err.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedCustomerType) response.successResponse(res, ['Customer Type Added'], 200, newCustomerType);
}

exports.updateCustomerType = async (req, res) => {
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
exports.deleteCustomerType = async (req, res) => {
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


//customer functions
exports.createCustomer = async (req, res) => {
    const { name, user_id, first_name, last_name, phone_number, gender, dob, customer_type_id } = req.body;

    const alreadyExistsUser = await User.findOne({ where: { phone_number } }).catch(
        (err) => {
            console.error('Error', err);
        }
    );
    if (alreadyExistsUser) {
        return response.errorRespose(res, ['User with phone number aready exists'], 409);
    }

    const newCustomer = new Customer({ name, user_id, first_name, last_name, phone_number, gender, dob, customer_type_id });
    const savedCustomerType = await newCustomer.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, err.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedCustomerType) response.successResponse(res, ['Customer Added'], 200, newCustomer);

}

exports.updateCustomer = async (req, res) => {
    const { first_name, last_name, phone_number, gender, dob } = req.body;

    const updatedCustomer = await CustomerType.update(
        { first_name, last_name, phone_number, gender, dob },
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (updatedCustomer) response.successResponse(res, ['Customer Updated'], 200, updatedCustomer);
}

exports.getAllCustomers = async (req, res) => {

    const customers = await Customer.findAll().catch((error) => {
        console.error("error", error);
        if (error.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, error, 404)
        }
    });

    if (customers) response.successResponse(res, '', 200, customers);

}

exports.getCustomer = async (req, res) => {

    const customer = await Customer.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );
    
    if (customer) {
        return response.successResponse(res, '', 400, {customer:customer, user: await User.findOne({where : {id : customer.user_id}})});
    }
}
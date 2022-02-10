const Customer = require('../models/customer');
const User = require('../models/user');
const CustomerType = require('../models/customer_type');
const response = require('../services/utils/response');
const Role = require('../models/role');
const Admin = require('../models/admin');

exports.test = (req, res) => {
    response.successResponse(res, 'Deployement Yaita iyi',200, { 'data': 'wariona data here' });
}
exports.getAdminRoles = async (req, res) => {

    const adminRoles = await Role.findAll().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (adminRoles) response.successResponse(res, '', 200, adminRoles);


}

exports.getAdminRole = async (req, res) => {

    const adminRole = await Role.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );
    if (adminRole) {
        return response.successResponse(res, '', 400, adminRole);
    }
}
exports.createAdminRoles = async (req, res) => {
    const { name } = req.body;

    const newAdminRole = new Role({ name });
    const savedAdminRole = await newAdminRole.save().catch((error) => {
        console.error("error", error);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedAdminRole) response.successResponse(res, ['Customer Type Added'], 200, newAdminRole);

}

exports.updateAdminRole = async (req, res) => {
    const { name } = req.body;

    const updatedAdminRole = await Role.update(
        { name: name },
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (updatedAdminRole) response.successResponse(res, ['Customer Type Updated'], 200, updatedAdminRole);
}
exports.deleteAdminRole = async (req, res) => {
    const { name } = req.body;

    const deletedAdminRole = await Role.destroy(
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (deletedAdminRole) response.successResponse(res, ['Customer Type Deleted'], 200, deletedAdminRole);
}


//customer functions
exports.createAdmin = async (req, res) => {
    const { user_id, first_name, last_name, phone_number, gender, role_id } = req.body;


    const newAdmin = new Admin({ user_id, first_name, last_name, phone_number, gender, role_id });
    const savedAdmin = await newAdmin.save().catch((error) => {
        console.error("error", error);
        if (error.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedAdmin) response.successResponse(res, ['Admin Account Created'], 200, newAdmin);
}

exports.updateAdmin = async (req, res) => {
    const { first_name, last_name, phone_number, gender } = req.body;

    const updatedAdmin = await Admin.update(
        { first_name, last_name, phone_number, gender, dob },
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    if (updatedAdmin) response.successResponse(res, ['Admin Account Updated'], 200, updatedAdmin);
}

exports.getAllAdmins = async (req, res) => {

    const admins = await Admin.findAll().catch((error) => {
        console.error("error", error);
        if (error.name === 'SequelizeValidationError') {
            return response.errorRespose(res, error.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, error, 404)
        }
    });

    if (admins) response.successResponse(res, '', 200, admins);

}

exports.getAdmin = async (req, res) => {

    const admin = await Admin.findOne({ where: { id: req.params.id } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
        }
    );

    if (admin) {
        return response.successResponse(res, '', 400, { admin: admin, user: await User.findOne({ where: { id: admin.user_id } }) });
    }
}
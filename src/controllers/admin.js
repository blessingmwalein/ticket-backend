const Customer = require('../models/customer');
const User = require('../models/user');
const CustomerType = require('../models/customer_type');
const response = require('../services/utils/response');
const Role = require('../models/role');
const Admin = require('../models/admin');

const bcrypt = require("bcrypt");

exports.test = (req, res) => {
    response.successResponse(res, 'Deployement Yaita iyi', 200, { 'data': 'wariona data here' });
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
    if (savedAdminRole) response.successResponse(res, ['Admin Role Added'], 200, newAdminRole);

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
    const { user_id, first_name, last_name, phone_number, gender, role_id, email, password } = req.body;

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.error('Error', err);
        }
    );
    if (alreadyExistsUser) {
        return response.errorRespose(res, ['User with email aready exists'], 422);
    }
    const newUser = new User({ email, password: `${first_name}.${last_name}123#` });
    const savedUser = await newUser.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, err.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });

    if (savedUser) {
        const newAdmin = new Admin({ user_id: newUser.id, first_name, last_name, phone_number, gender, role_id });
        const savedAdmin = await newAdmin.save().catch((error) => {
            console.error("error", error);
            if (error.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
        if (savedAdmin) response.successResponse(res, ['Admin Account Created'], 200, { admin: newAdmin, user: newUser });
    };
}

exports.updateAdmin = async (req, res) => {
    const { first_name, last_name, phone_number, gender, email, password } = req.body;

    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, err.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 422)
            }
        }
    );;

    if (!await bcrypt.compare(password, userWithEmail.password)) {
        return response.errorRespose(res, ['Password does not match'], 403);
    }

    const updatedAdmin = await Admin.update(
        { first_name, last_name, phone_number, gender },
        { where: { id: req.params.id } }).catch((error) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, error.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        });
    const admin = await Admin.findOne({ id: req.params.id })
    if (updatedAdmin) response.successResponse(res, ['Details Updated'], 200, { user: userWithEmail, admin: admin });
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
        return response.successResponse(res, '', 200, { admin: admin, user: await User.findOne({ where: { id: admin.user_id } }), role: await Role.findOne({ where: { id: admin.role_id } }) });
    }
}
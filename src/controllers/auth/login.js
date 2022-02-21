const User = require('../../models/user');
const response = require('../../services/utils/response');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const bcrypt = require("bcrypt");
const Admin = require('../../models/admin');
const Role = require('../../models/role');

exports.loginCustomer = async (req, res, next) => {

    const { email, password } = req.body;

    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, err.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 404)
            }
        }
    );

    if (!userWithEmail) {
        return response.errorRespose(res, ['Email or password does not match'], 400);
    }


    if (!await bcrypt.compare(password, userWithEmail.password)) {
        return response.errorRespose(res, ['Email or password does not match'], 400);
    }

    const jwtToken = jwt.sign(
        {
            id: userWithEmail.id,
            email: userWithEmail.email,
            role: 'Customer'
        },
        process.env.JWT_SECRET
    );

    return response.successResponse(res, 'Successfull Login', 200, { token: jwtToken });

}
exports.loginAdmin = async (req, res, next) => {

    const { email, password } = req.body;

    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.error("error", err);
            if (err.name === 'SequelizeValidationError') {
                return response.errorRespose(res, err.errors.map(e => e.message), 422)
            } else {
                return response.errorRespose(res, req.body.name, 422)
            }
        }
    );
    if (!userWithEmail) {
        return response.errorRespose(res, ['Email or password does not match'], 403);
    }


    if (!await bcrypt.compare(password, userWithEmail.password)) {
        return response.errorRespose(res, ['Email or password does not match'], 403);
    }

    const user_id = userWithEmail.id

    const admin = await Admin.findOne({ where: { user_id } }).catch((error) => {
        return response.errorRespose(res, ['Can not find Admin account for user. Please Contact admin'], 403);
    })

    if (admin) {

        const role = await Role.findOne({ where: { id: admin.role_id } })
        const jwtToken = jwt.sign(
            {
                id: userWithEmail.id,
                email: userWithEmail.email,
                role: 'Admin'
            },
            process.env.JWT_SECRET
        );

        return response.successResponse(res, 'Successfull Login', 200, { token: jwtToken, user: userWithEmail, admin: admin, role : role });
    }
}

exports.getUser = async (req, res) => {
    return response.successResponse(res, "Logged In", 200, userWithEmail)
}
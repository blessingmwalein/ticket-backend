const User = require('../../models/user');
const response = require('../../services/utils/response');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const bcrypt = require("bcrypt");

exports.loginCustomer = async (req, res, next) => {

    const { email, password } = req.body;

    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
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
            role : 'Customer'
        },
        process.env.JWT_SECRET
    );

    return response.successResponse(res, 'Successfull Login', 200, { token: jwtToken });

}
exports.loginAdmin = async (req, res, next) => {

    const { email, password } = req.body;

    const userWithEmail = await User.findOne({ where: { email } }).catch(
        (error) => {
            console.log("Error", EvalError);
            return response.errorRespose(res, [error], 404)
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
            role : 'Admin'
        },
        process.env.JWT_SECRET
    );

    return response.successResponse(res, 'Successfull Login', 200, { token: jwtToken });

}

exports.getUser = async (req, res) => {
  return response.successResponse(res,"Logged In", 200, userWithEmail )
}
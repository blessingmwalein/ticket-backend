const User = require('../../models/user');
const response = require('../../services/utils/response');

exports.registerUser = async (req, res, next) => {

    const { email, password } = req.body;

    const alreadyExistsUser = await User.findOne({ where: { email } }).catch(
        (err) => {
            console.error('Error', err);
        }
    );
    if (alreadyExistsUser) {
        return response.errorRespose(res, ['User with email aready exists'], 409);
    }
    const newUser = new User({ email, password });
    const savedUser = await newUser.save().catch((err) => {
        console.error("error", err);
        if (err.name === 'SequelizeValidationError') {
            return response.errorRespose(res, err.errors.map(e => e.message), 422)
        } else {
            return response.errorRespose(res, req.body.name, 404)
        }
    });
    if (savedUser) response.successResponse(res, ['User registered successfully'], 200, newUser);
} 



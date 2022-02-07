const { successResponse } = require("../services/utils/response")



exports.getAdminRoles = async (req, res) => {

    // const adminRoles = await Role.findAll().catch((err) => {
    //     console.error("error", err);
    //     if (err.name === 'SequelizeValidationError') {
    //         return response.errorRespose(res, error.errors.map(e => e.message), 422)
    //     } else {
    //         return response.errorRespose(res, req.body.name, 404)
    //     }
    // });
    // if (adminRoles) response.successResponse(res, '', 200, adminRoles);
    return successResponse(res, 'Zvaita ', 200)

}

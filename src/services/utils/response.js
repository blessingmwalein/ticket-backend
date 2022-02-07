function errorRespose(res,message, code){
   return res.status(code).json({
        success: false,
        msg: message
    }) 
}

function successResponse( res, message, code = 200, data ={}) {
    return res.status(code).json({
        success: true,
        msg: message,
        data : data
    })
}

module.exports = {
    errorRespose,
    successResponse,
}
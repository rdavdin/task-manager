const { CustomAPIError } = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req, res, next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg: err.message});
    }
    res.status(500).json({msg: `Something wrong! Try again later.`});
}

module.exports = errorHandlerMiddleware;
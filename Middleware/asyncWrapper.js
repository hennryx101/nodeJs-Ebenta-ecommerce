const errorHandler = require("./errorHandler");

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try{
            await fn(req, res, next);
        }catch(error){
            const errors = errorHandler(error);
            console.log(errors, "----------");
            res.status(400).json({ errors });
        }
    }
}

module.exports = asyncWrapper;
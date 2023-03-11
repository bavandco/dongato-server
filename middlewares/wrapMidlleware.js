const {baseResponse} = require('../utils/functions');
const {resultCode} = require('../utils/works');

module.exports = function (schema) {
    return (req, res, next) => {
        const result = schema.validate(req.body, {abortEarly: false});
        if (result.error) {
            baseResponse(
                res,
                false,
                result.error.details,
                resultCode.Validation,
                400
            );
        } else {
            next();
        }
    };
}
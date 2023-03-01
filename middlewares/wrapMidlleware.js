module.exports = function (schema) {
    return (req, res, next) => {
        const result = schema.validate(req.body, {abortEarly: false});
        if (result.error) {
            res.status(400);
            return res.send(
                {
                    status: false,
                    data: result.error.details
                }
            );
        } else {
            next();
        }
    };
}
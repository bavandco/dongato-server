const Joi = require('joi');


module.exports.create = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
});

module.exports.login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
module.exports.getTokenByRefreshToken = Joi.object().keys({
    email: Joi.string().email().required(),
    refreshToken: Joi.string().required()
});


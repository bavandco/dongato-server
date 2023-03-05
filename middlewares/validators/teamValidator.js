const Joi = require('joi');


module.exports.create = Joi.object().keys({
    name: Joi.string().required()
});
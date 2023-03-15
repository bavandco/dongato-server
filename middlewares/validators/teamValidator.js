const Joi = require('joi');


module.exports.create = Joi.object().keys({
    name: Joi.string().required()
});

module.exports.addMember = Joi.object().keys({
    userEmail: Joi.string().email().required()
});

module.exports.addAdmin = Joi.object().keys({
    userEmail: Joi.string().email().required()
});


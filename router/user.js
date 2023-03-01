const Router = require("express").Router();
const wrapMiddleware = require('../middlewares/wrapMidlleware');
const userValidator = require('../middlewares/validators/userValidator')


Router.post('/', wrapMiddleware(userValidator.create), (req, res) => {

});

module.exports = Router;

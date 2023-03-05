const Router = require("express").Router();
const wrapMiddleware = require('../middlewares/wrapMidlleware');
const userValidator = require('../middlewares/validators/userValidator')
const {baseResponse} = require('../utils/functions');
const {resultCode} = require('../utils/works');
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware');
const teamMiddleware = require('../middlewares/validators/teamValidator');
const _ = require('lodash');
const {teamApp} = require('../instances/app');


Router.post('/', verifyTokenMiddleware, wrapMiddleware(teamMiddleware.create), async (req, res) => {
    try {
        let result = await teamApp.createTeam(req.body.token.id, req.body.name);
        if (!result) {
            return baseResponse(res, false, 'server error.', resultCode.ServerError,);
        }
        return baseResponse(res, true, result);
    } catch (e) {
        console.log(e);
        return baseResponse(res, false, 'server error.', resultCode.ServerError,);
    }
})

module.exports = Router;

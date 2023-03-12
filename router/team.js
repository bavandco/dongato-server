const Router = require("express").Router();
const wrapMiddleware = require('../middlewares/wrapMidlleware');
const {baseResponse} = require('../utils/functions');
const {resultCode} = require('../utils/works');
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware');
const teamValidator = require('../middlewares/validators/teamValidator');
const _ = require('lodash');
const {teamApp} = require('../instances/app');
const canAddMember = require('../middlewares/canAddMember');
const BaseAppStatusCode = require('../app/Base/BaseAppStatusCode');

Router.post('/', wrapMiddleware(teamValidator.create), verifyTokenMiddleware, async (req, res) => {
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


Router.post('/:tid/addMember', wrapMiddleware(teamValidator.addMember), verifyTokenMiddleware, canAddMember, async (req, res) => {
    const result = await teamApp.addUserToTeam(req.body.userEmail, req.params.tid);

    if (!result.status) {
        if (result.statusCode === BaseAppStatusCode.Duplicate) {
            return baseResponse(res, false, {}, resultCode.Duplicate, 409);
        } else if (result.statusCode === BaseAppStatusCode.NotFounded) {
            return baseResponse(res, false, {}, resultCode.NotFounded, 404);
        } else {
            return baseResponse(res, false, {}, resultCode.ServerError, 500);
        }
    }

    return baseResponse(res, true, {
        message: 'member added',
    });
});


module.exports = Router;

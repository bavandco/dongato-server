const Router = require("express").Router();
const wrapMiddleware = require('../middlewares/wrapMidlleware');
const userValidator = require('../middlewares/validators/userValidator')
const {baseResponse} = require('../utils/functions');
const {resultCode} = require('../utils/works');
const verifyTokenMiddleware = require('../middlewares/verifyTokenMiddleware');
const _ = require('lodash');
const {userApp} = require('../instances/app');

Router.post('/', wrapMiddleware(userValidator.create), async (req, res) => {
    try {
        let result = await userApp.createUser(req.body.email, req.body.password, req.body.name);
        baseResponse(res, true, {
            _id: result._id,
            token: result.token,
            refreshToken: result.refreshToken
        })
    } catch (e) {
        baseResponse(res, false, 'user already exists.', resultCode.Duplicate, 400)
    }
});

Router.post('/login', wrapMiddleware(userValidator.login), async (req, res) => {
    try {
        let result = await userApp.getTokenByUserEmailAndPassword(req.body.email, req.body.password);
        if (!result) {
            return baseResponse(res, false, 'user name and password match.', resultCode.NotMatch, 401);
        }
        baseResponse(res, true, result);
    } catch (e) {
        console.log(e);
        baseResponse(res, false, 'user name and password match.', resultCode.NotMatch, 401);
    }
});

Router.post('/token', wrapMiddleware(userValidator.getTokenByRefreshToken), async (req, res) => {
    try {
        let result = await userApp.getTokenByRefreshToken(req.body.email, req.body.refreshToken);
        if (!result) {
            return baseResponse(res, false, 'invalid token.', resultCode.Invalid, 401);
        }

        return baseResponse(res, true, result);
    } catch (e) {
        console.log(e);
        baseResponse(res, false, 'server error.', resultCode.ServerError, 500);
    }
});


Router.get('/me', verifyTokenMiddleware, async (req, res) => {
    let user = await userApp.getMe(req.body.token.id);
    if (!user) {
        return baseResponse(res, false, 'user not founded.', resultCode.NotFounded, 404);
    }

    return baseResponse(res, true, _.pickBy(user, (value, key) => {
        return key !== 'password' && key !== 'refreshTokens' && key !== '_v';
    }));
});
module.exports = Router;

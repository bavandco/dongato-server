const Router = require("express").Router();
const wrapMiddleware = require('../middlewares/wrapMidlleware');
const userValidator = require('../middlewares/validators/userValidator')
const UserApp = require('../app/UserApp');
const {baseResponse} = require('../utils/functions');
const {resultCode} = require('../utils/works');

const userApp = new UserApp();

Router.post('/', wrapMiddleware(userValidator.create), async (req, res) => {
    try {
        let result = await userApp.createUser(req.body.email, req.body.password, req.body.name);
        baseResponse(res, true, {_id: result._id})
    } catch (e) {
        baseResponse(res, false, 'user already exists.', resultCode.Duplicate, 400)
    }
});

Router.post('/login', wrapMiddleware(userValidator.login), async (req, res) => {
    try {
        let result = await userApp.getTokenByUserEmailAndPassword(req.body.email, req.body.password);
        baseResponse(res, true, result);
    } catch (e) {
        console.log(e);
        baseResponse(res, false, 'user name and password match.', resultCode.NotMatch, 401);
    }
});
module.exports = Router;

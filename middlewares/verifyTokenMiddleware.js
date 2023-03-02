const {baseResponse} = require('../utils/functions');
const {resultCode} = require('../utils/works');
const {userApp} = require('../instances/app');

module.exports = async function (req, res, next) {
    // get token from header
    let token = req.headers['authorization'];

    // check if token exists
    if (!token) {
        return baseResponse(res, false, "Token is not provided", resultCode.NotAuthorized, 401);
    }
    token = (token).replace('Bearer ', '');
    let result = await userApp.verifyToken(token);
    if (!result){
        return baseResponse(res, false, "Token is not provided", resultCode.NotAuthorized, 401);
    }
    req.body.token = result;
    next();
}
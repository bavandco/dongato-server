// config dotenv package
let dotenv = require('dotenv');
dotenv.config();

module.exports.resultCode = {
    Duplicate: 'Duplicate',
    Validation: 'Validation',
    Ok: 'Ok',
    NotMatch: 'NotMatch',
    ServerError: 'ServerError',
    Invalid: 'Invalid',
    NotAuthorized: 'NotAuthorized',
};
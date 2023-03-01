const Router = require("express").Router();
const wrapMiddleware = require('../middlewares/wrapMidlleware');
const userValidator = require('../middlewares/validators/userValidator')


Router.get('/', (req, res) => {
    res.send('run');
});

Router.post('/',wrapMiddleware(userValidator.create),(req,res)=>{
    res.send('ok');
});


module.exports = Router;

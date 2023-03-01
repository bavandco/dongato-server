const Router = require("express").Router();

Router.get('/', (req, res) => {
    res.send('run');
});

module.exports = Router;

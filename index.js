const utilsWorks = require('./utils/works');
const express = require('express');
const rootRouter = require('./router/root');
const mongoose = require('mongoose');



mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dongato')
    .then(() => {
        console.log("ok")
        const app = express();

        // add routes
        app.use('/', rootRouter);
        app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost', () => {
            console.log('App Start: http://' + (process.env.HOST || 'localhost') + ':' + process.env.PORT || 3000);
        });
    })
    .catch(err => {
        console.log(err)
    })

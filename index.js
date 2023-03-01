const utilsWorks = require('./utils/works');
const express = require('express');
const rootRouter = require('./router/root');
const userRouter = require('./router/user');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/dongato')
    .then(() => {
        const app = express();

        app.use(express.json());

        // add routes
        app.use('/', rootRouter);
        app.use('/api/user', userRouter);

        app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost', () => {
            console.log('App Start: http://' + (process.env.HOST || 'localhost') + ':' + process.env.PORT || 3000);
        });
    })
    .catch(err => {
        console.log(err)
    })

const utilsWorks = require('./utils/works');
const express = require('express');

const app = express();


app.listen(process.env.PORT || 3000, process.env.HOST || 'localhost', () => {
    console.log('App Start: http://' + (process.env.HOST || 'localhost') + ':' + process.env.PORT || 3000);
});
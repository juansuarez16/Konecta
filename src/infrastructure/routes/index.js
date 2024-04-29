const express = require('express');
const userRouter = require('./userRoutes');
const requestRouter = require('./requestRoutes');
const employeeRouter = require('./employeeRoutes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1',router);
routerApi.use('/users', userRouter);
routerApi.use('/requests', requestRouter);
routerApi.use('/employees', employeeRouter);
}



module.exports = routerApi;
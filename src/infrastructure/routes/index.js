const express = require('express');
const userRouter = require('./userRoutes');
const requestRouter = require('./requestRoutes');
const employeeRouter = require('./employeeRoutes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1',router);
    router.use('/users', userRouter);
    router.use('/requests', requestRouter);
    router.use('/employees', employeeRouter);
}



module.exports = routerApi;
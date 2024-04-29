const { User, UserSchema } = require('./user');
const { Employee, EmployeeSchema } = require('./employe');
const { Request, RequestSchema } = require('./request');


function setupModels(sequelize) {
    User.init(UserSchema,User.config(sequelize));
    Employee.init(EmployeeSchema,Employee.config(sequelize));
    Request.init(RequestSchema,Request.config(sequelize));
}

module.exports = setupModels;
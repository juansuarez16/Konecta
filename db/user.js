const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const { Employee } = require('../../domain/Models/Employee'); // Importa el modelo de entidad Employee

const User_TABLE = 'user';

class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: User_TABLE,
            modelName: 'User',
            timestamps: true,
            underscored: true
        };
    }
}

const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('empleado', 'administrador'),
        allowNull: false
    },
    empleadoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee, 
            key: 'id'
        }
    }
};

module.exports = { User, UserSchema };

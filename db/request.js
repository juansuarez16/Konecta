const { Model, DataTypes } = require('sequelize');
const { Employee } = require('../../domain/Models/Employee'); // Importa el modelo de entidad Employee

const Request_TABLE = 'request';

class Request extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: Request_TABLE,
            modelName: 'Request',
            timestamps: true,
            underscored: true
        };
    }
}

const RequestSchema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    resumen: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee, 
            key: 'id'
        }
    }
};

module.exports = { Request, RequestSchema };

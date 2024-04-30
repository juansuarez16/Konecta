const { Model, DataTypes } = require('sequelize');
const { Employee } = require('../../domain/Models/Employee'); // Importa el modelo de entidad Employee

const Employee_TABLE = 'employee'; // Cambia el nombre de la tabla a "employee"

class Employee extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: Employee_TABLE,
            modelName: 'Employee',
            timestamps: true,
            underscored: true
        };
    }
}

const EmployeeSchema = {
    ID: { // Cambia el nombre de la columna a "ID"
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_ingreso: { // Cambia el nombre de la columna a "fecha_ingreso"
        type: DataTypes.DATE,
        allowNull: false
    },
    Nombre: { // Cambia el nombre de la columna a "Nombre"
        type: DataTypes.STRING(50),
        allowNull: false
    },
    salario: {
        type: DataTypes.NUMBER, // Cambia el tipo de dato a "NUMBER"
        allowNull: false
    },
    Id_Usuario: { // Cambia el nombre de la columna a "Id_Usuario"
        type: DataTypes.STRING, // Cambia el tipo de dato a "STRING"
        allowNull: false,
        references: {
            model: Employee, 
            key: 'ID' // Cambia la clave de referencia a "ID"
        }
    }
};

module.exports = { Employee, EmployeeSchema };

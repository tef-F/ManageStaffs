const { DataTypes, Sequelize } = require('sequelize');
const { getSequelize } = require('../../config/db');
const Salary = getSequelize().define(
    'salary',
    {
        salaryScale: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        basicRate: {
            type: DataTypes.INTEGER,
        },
        coefficientsSalary: {
            type: DataTypes.NUMBER,
        },
        allowanceCoefficient: {
            type: DataTypes.NUMBER,
        },
    },
);
getSequelize().sync();
module.exports = Salary;

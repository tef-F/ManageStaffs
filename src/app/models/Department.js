const { DataTypes } = require('sequelize');
const {getSequelize } = require('../../config/db');
const Department = getSequelize().define(
    'department',
    {
        id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
            trim: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        address: {
            type: DataTypes.STRING(255),
        },
        phoneNumber: {
            type: DataTypes.NUMBER,
        },
        Email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        staffId: {
            type: DataTypes.STRING(10),
            allowNull: true,
        }
    },
);
getSequelize().sync();
module.exports = Department;

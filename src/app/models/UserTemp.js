const { DataTypes, Sequelize } = require('sequelize');
const {getSequelize } = require('../../config/db');
const UserTemp = getSequelize().define(
    'account_temp',
    {
        id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
            trim: true,
        },
        username: {
            type: DataTypes.STRING(50),
        },
        password: {
            type: DataTypes.STRING(255),
            trim: true,
            required: true,
        },
        email: {
            type: DataTypes.STRING(50),
        },
        departmentId: {
            type: DataTypes.STRING(10),
        },
    },
    {
        // options
        timestamps: false,
        hasTrigger: true,
    },
);
getSequelize().sync();
module.exports = UserTemp;

const { DataTypes, Sequelize } = require('sequelize');
const { getSequelize } = require('../../config/db');
const User = getSequelize().define(
    'account',
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
        avatar: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(50),
        },
        role: {
            type: DataTypes.STRING(10),
        },
        staffId: {
            type: DataTypes.STRING(10),
            allowNull: true,

        }
    },
);
getSequelize().sync();
module.exports = User;

const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const User = sequelize.define(
    'TAIKHOAN',
    {
        MaTK: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
            trim: true,
        },
        Username: {
            type: DataTypes.STRING(50),
        },
        Password: {
            type: DataTypes.STRING(255),
            trim: true,
            required: true,
        },
        Avatar: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        Email: {
            type: DataTypes.STRING(50),
        },
        Role: {
            type: DataTypes.STRING(10),
        },
    },
);
sequelize.sync();
module.exports = User;

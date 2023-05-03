const { DataTypes, Sequelize } = require('sequelize');
const { getSequelize } = require('../../config/db');
const Area = getSequelize().define(
    'area',
    {
        id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
        address: {
            type: DataTypes.STRING(50),
        },
        contact: {
            type: DataTypes.STRING(255),
        }
    },
);
getSequelize().sync();
module.exports = Area;

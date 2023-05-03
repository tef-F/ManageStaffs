const { DataTypes, Sequelize } = require('sequelize');
const { getSequelize } = require('../../config/db');
const Contract = getSequelize().define(
    'labor_contract',
    {
        id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(50),
        },
        joinDate: {
            type: DataTypes.DATE,
        },
        finishDate: {
            type: DataTypes.DATE,
        },
    },
);
getSequelize().sync();
module.exports = Contract;

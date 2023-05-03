const { DataTypes, Sequelize } = require('sequelize');
const { getSequelize } = require('../../config/db');
const Literacy = getSequelize().define(
    'literacy',
    {
        id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        specialization: {
            type: DataTypes.STRING(50),
        },
        academicLevel: {
            type: DataTypes.STRING(50),
        }
    },
);
getSequelize().sync();
module.exports = Literacy;

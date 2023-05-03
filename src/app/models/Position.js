const { DataTypes, Sequelize } = require('sequelize');
const { getSequelize } = require('../../config/db');
const Position = getSequelize().define(
    'position',
    {
        id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
        },
    },
    {
        // options
        timestamps: false,
        hasTrigger: true,
    },
);
getSequelize().sync();
module.exports = Position;

const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const Position = sequelize.define(
    'CHUCVU',
    {
        MaCV: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        TenCV: {
            type: DataTypes.STRING(50),
        },
    },
    {
        timestamps: false,
        hasTrigger: true,
    },
);
sequelize.sync();
module.exports = Position;

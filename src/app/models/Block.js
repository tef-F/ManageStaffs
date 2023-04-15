const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const Block = sequelize.define(
    'KHUVUC',
    {
        MaKhu: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        TenKhu: {
            type: DataTypes.STRING(50),
        },
        DiaChi: {
            type: DataTypes.STRING(50),
        },
        LienHe: {
            type: DataTypes.STRING(255),
        }
    },
);
sequelize.sync();
module.exports = Block;

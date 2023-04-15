const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const Department = sequelize.define(
    'PHONGBAN',
    {
        MaPB: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
            trim: true,
        },
        TenPB: {
            type: DataTypes.STRING(50),
        },
        DiaChi: {
            type: DataTypes.STRING(255),
        },
        SDTPB: {
            type: DataTypes.NUMBER,
        },
        Email: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        MaNVQuanLi: {
            type: DataTypes.STRING(10),
            allowNull: true,
        }
    },
);
sequelize.sync();
module.exports = Department;

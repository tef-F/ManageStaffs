const { DataTypes, Sequelize } = require('sequelize');
const { getSequelize } = require('../../config/db');
const Staff = getSequelize().define(
    'staff',
    {
        id: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        fullName: {
            type: DataTypes.STRING(50),
        },
        DoB: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        homeTown: {
            type: DataTypes.STRING(50),
            allowNull: true,

        },
        sex: {
            type: DataTypes.STRING(10),
            allowNull: true,

        },
        nation: {
            type: DataTypes.STRING(30),
            allowNull: true,

        },
        phoneNumber: {
            type: DataTypes.NUMBER,
            allowNull: true,

        },
        graduationDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        university: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        departmentId: {
            type: DataTypes.STRING(10),
        },
        literacyId: {
            type: DataTypes.STRING(10),
            allowNull: true,

        },
        salaryScale: {
            type: DataTypes.STRING(10),
            allowNull: true,

        },
        area: {
            type: DataTypes.STRING(10),
            allowNull: true,

        },
        position: {
            type: DataTypes.STRING(10),
            allowNull: true,

        },
        laborContract: {
            type: DataTypes.STRING(10),
            allowNull: true,

        },
    },
    {
        timestamps: false,
    },
);
getSequelize().sync();
module.exports = Staff;

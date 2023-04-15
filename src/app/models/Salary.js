const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const Salary = sequelize.define(
    'LUONG',
    {
        BacLuong: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        LuongCB: {
            type: DataTypes.INTEGER,
        },
        HSLuong: {
            type: DataTypes.NUMBER,
        },
        HSPhuCap: {
            type: DataTypes.NUMBER,
        },
    },
);
sequelize.sync();
module.exports = Salary;

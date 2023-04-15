const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const Contract = sequelize.define(
    'HOPDONGLAODONG',
    {
        MaHD: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        LoaiHD: {
            type: DataTypes.STRING(50),
        },
        TuNgay: {
            type: DataTypes.DATE,
        },
        DenNgay: {
            type: DataTypes.DATE,
        },
    },
);
sequelize.sync();
module.exports = Contract;

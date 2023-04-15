const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const Academic = sequelize.define(
    'TRINHDO',
    {
        MaTDHV: {
            type: DataTypes.STRING(10),
            allowNull: false,
            primaryKey: true,
        },
        TenChuyenNganh: {
            type: DataTypes.STRING(50),
        },
        TrinhDoHocVan: {
            type: DataTypes.STRING(50),
        }
    },
);
sequelize.sync();
module.exports = Academic;

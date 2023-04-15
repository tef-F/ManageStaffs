const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../../config/db');
const Staff = sequelize.define('NHANVIEN', {
    MaNV: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        trim: true,
    },
    HoTen: {
        type: DataTypes.STRING(50),
    },
    NgaySinh: {
        type: DataTypes.DATE,
    },
    QueQuan: {
        type: DataTypes.STRING(50),
    },
    GioiTinh: {
        type: DataTypes.STRING(10),
    },
    DanToc: {
        type: DataTypes.STRING(30),
    },
    SoDienThoai: {
        type: DataTypes.NUMBER,
    },
    NgayTotNghiep: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    TruongTheoHoc: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    MaPB: {
        type: DataTypes.STRING(10),
    },
    MaTDHV: {
        type: DataTypes.STRING(10),
    },
    BacLuong: {
        type: DataTypes.STRING(10),
    },
    MaKhu: {
        type: DataTypes.STRING(10),
    },
    MaCV: {
        type: DataTypes.STRING(10),
    },
    MaHD: {
        type: DataTypes.STRING(10),
    },
});
sequelize.sync();
module.exports = Staff;

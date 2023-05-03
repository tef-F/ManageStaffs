const mongoose = require('mongoose');
// const sql = require('mssql');
const { Sequelize, Model } = require('sequelize');
const dotenv = require('dotenv').config();

async function connect() {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(`mongodb://127.0.0.1/${process.env.DB_NAME}`);
        console.log('Connect successfully !!!');
    } catch (error) {
        console.log('\nConnect Faill !!!', error);
    }
}
let sequelize = null;

function initializeConnection(severName = 'SERVER_ROOT') {
    // console.log(severName);
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            port: 1433,
            host: 'localhost',
            dialect: 'mssql',
            dialectOptions: {
                instancename: severName,
            },
            define: {
                freezeTableName: true,
                noPrimaryKey: true,
                timestamps: false,
            },
        },
    );
}
initializeConnection();

function getSequelize() {
    return sequelize;
    
}

function closeConnection() {
    sequelize.close();
}

sequelize.afterDefine((model) => {
    if (model.prototype instanceof Model) {
        model.prototype.toObject = function () {
            const values = Object.assign({}, this.get());
            return values;
        };
    }
});

async function connectMSSQL() {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log('Connect MSSQL successfully !!!');
    } catch (error) {
        console.log('\nConnect Faill to MSSQL !!!', error);
    }
}
module.exports = {
    connect,
    connectMSSQL,
    initializeConnection,
    getSequelize,
    sequelize,
    closeConnection,
};

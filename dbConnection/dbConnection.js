const { Sequelize } = require('sequelize');
const config = require('../config/config.json');
const env = process.env.NODE_EN || 'production';
const dbConfig = config[env].db;
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
sequelize.sync({ alter: true })
module.exports = sequelize;
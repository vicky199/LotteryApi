const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/dbConnection')
const Role = sequelize.define("role", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    }, isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});
module.exports = Role;
const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/dbConnection')
const Role = require('./role.model')
const User = sequelize.define("user", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    mobileNo: {
        type: Sequelize.BIGINT(10),
        allowNull: false
    },
    emailId: {
        type: Sequelize.STRING(100),
        allowNull: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    }, isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});
Role.hasMany(User, {
    foreignKey: {
        name: 'roleId',
        type: Sequelize.BIGINT
        ,allowNull: false
    }
})
module.exports = User;
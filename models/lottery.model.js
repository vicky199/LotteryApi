const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/dbConnection')
const SlotDateMap = require('./slotDateMap.model')
const Lottery = sequelize.define("lottery", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    mobileNo: {
        type: Sequelize.STRING(10)
        ,allowNull: false
    },
    number: {
        type: Sequelize.STRING
        , allowNull: false
    }

}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // your other configuration here
  });
SlotDateMap.hasMany(Lottery, {
    foreignKey: {
        name: 'slotDateMapId',
        type: Sequelize.BIGINT
        , allowNull: false
    }
})
module.exports = Lottery;
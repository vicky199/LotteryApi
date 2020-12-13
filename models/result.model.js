const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/dbConnection')
const SlotDateMap = require('./slotDateMap.model')
const Lottery = require('./lottery.model')
const Result = sequelize.define("result", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // your other configuration here
  });
SlotDateMap.hasOne(Result, {
    foreignKey: {
        name: 'slotDateMapId',
        type: Sequelize.BIGINT
        , allowNull: false
    }
})
Lottery.hasOne(Result, {
    foreignKey: {
        name: 'lotteryId',
        type: Sequelize.BIGINT
        , allowNull: false
    }
})
module.exports = Result;
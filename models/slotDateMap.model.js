const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/dbConnection')
const Slot=require('./slot.model')
const SlotDateMap = sequelize.define("slotDateMap", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },

}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // your other configuration here
  });
Slot.hasMany(SlotDateMap, {
    foreignKey: {
        name: 'slotId',
        type: Sequelize.BIGINT
        ,allowNull: false
    }
})
module.exports = SlotDateMap;
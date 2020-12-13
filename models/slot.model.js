const Sequelize = require('sequelize');
const sequelize = require('../dbConnection/dbConnection')
const Slot = sequelize.define("slot", {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    from: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    to:{
        type: Sequelize.STRING(10),
        allowNull: false
    }
}, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    // your other configuration here
  });
module.exports = Slot;
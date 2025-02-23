const { DataTypes } = require("sequelize");
const {sequelize, User} = require("../config/database");

const Humidity = sequelize.define("Humidity", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    windspeed: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    airquality: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precipitation: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "humidity",
    timestamps: false     
});

module.exports = Humidity;

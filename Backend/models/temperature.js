const { DataTypes } = require("sequelize");
const {sequelize, User} = require("../config/database");

const Temperature = sequelize.define("Temperature", {
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
    celsius: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fahrenheit: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "temperature",
    timestamps: false     
});

module.exports = Temperature;

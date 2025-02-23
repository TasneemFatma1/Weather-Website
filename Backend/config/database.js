const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("weather", "", "", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error("Database connection error:", err));

// Define User Model
const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "users", 
    timestamps: false 
});

module.exports = { sequelize, User };

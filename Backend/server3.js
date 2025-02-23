const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const session = require("express-session");
const { sequelize, User } = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const dataRoutes = require('./routes/dataRoutes');

const app = express();

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true 
}));
app.use(express.json());

const secretKey = '';
const db = mysql.createConnection({
    host: "localhost",
    user: "",
    password: "",
    database: "weather"
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to MySQL!");
});

app.use(session({
    secret: "",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        maxAge: 30 * 60 * 1000 // 30 minutes session expiry (in milliseconds)
    }
}));

sequelize.sync()
    .then(() => console.log("Database synced!"))
    .catch(err => console.error("Sync error:", err));

app.use("/auth", authRoutes);
app.use("/weather", weatherRoutes);
app.use('/api', dataRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Weather API</h1>");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

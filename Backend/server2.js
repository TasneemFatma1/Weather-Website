const cors = require('cors');
const bcrypt=require('bcrypt')
const fs = require('fs');
const path = require('path');
const http = require('http');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
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

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});
app.get('/first', (req, res) => {
    res.send('<h1>Hello express, Express.js Server!</h1>');
});

//reading the data present in the data.json file when calling this api
app.get('/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

app.post('/signin',async (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'All fields (username, password) are required'});
    }
    const checkerquery="SELECT * FROM users WHERE username = ? OR password = ?";
    db.query(checkerquery, [username,password], async (err,result) =>{
        if (err) {
            console.error("Database error: ", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(result.length>0){
            return res.status(400).json({error:"User already exists"});
        }
        const sql="INSERT INTO users (username, password) VALUES (?, ?)";
        const hashedPassword = await bcrypt.hash(password, 5);
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error inserting data: ", err);
                return res.status(500).json({ error: "Database error" });
            }
            return res.status(201).json({message:"Users registerd successfully"});
        });
    })
});

function authenticateToken(req, res, next) {
    console.log(req.headers)
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
}

app.post('/login', (req,res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'All fields (username, password) are required'});
    }
    const sql="SELECT * FROM users WHERE username = ?";
    db.query(sql,[username],async (err, result) => {
        if (err) {
            console.error("Error fetching data: ", err);
            return res.status(500).json({ error: "Database error" });
        }
        if(result.length===0) {
            return res.status(400).json({ error: "Invalid username" });
        }
        const user=result[0];
        const storedHashedPassword=user.password;
        const passwordMatch = await bcrypt.compare(password, storedHashedPassword);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '10s' });
        console.log(token)
        return res.status(200).json({ message: "Logged in successfully", token: token });
    });

});

app.post('/logout', (req, res) => {
    if(req.session.user){
        req.session.destroy((err) => {
            if (err) return res.status(500).json({ error: "Logout failed" });
            res.json({ message: "Logged out successfully" });
        });
    }
});

app.post('/upload', (req, res) => {
    console.log(req.body)
    const { fruit, size, color } = req.body;

    if (!fruit || !size || !color) {
        return res.status(400).json({ error: 'All fields (fruit, size, color) are required' });
    }

    const newEntry = { fruit, size, color };
    const filePath = path.join(__dirname, 'data.json');

    // Read the existing JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = [];

        try {
            jsonData = JSON.parse(data); // Parse JSON data
            if (!Array.isArray(jsonData)) {
                jsonData = []; // Ensure it's an array
            }
        } catch (parseError) {
            return res.status(500).json({ error: 'Invalid JSON format' });
        }

        jsonData.push(newEntry); // Add new object to array

        // Write updated data back to file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ error: 'Failed to save data' });
            }

            res.status(201).json({ message: 'Data added successfully', data: newEntry });
        });
    });
});

app.put('/update', (req,res) => {
    const name=req.body.name
    if(name=="Tasneem"){
        console.log("Found in db")
    }
});

app.post("/insert", authenticateToken, (req, res) => {
    const { city, temp } = req.body; // Read data from request body
    
    if (!city || !temp) {
        return res.status(400).json({ error: "City and Temp are required!" });
    }

    const sql = "INSERT INTO temperature (city, temp) VALUES (?, ?)";
    db.query(sql, [city, temp], (err, result) => {
        if (err) {
            console.error("Error inserting data: ", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Data inserted successfully!", data: { city, temp } });
    });
});

app.get("/getdata", (req, res) => {
    const sql = "SELECT * FROM temperature";  // Corrected query
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching data: ", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result);  // Send full table data
    });
});


const port = process.env.PORT || 4000; // You can use environment variables for port configuration

app.listen(port, () => {
    console.log(`Server running on port port ${port}`);
});
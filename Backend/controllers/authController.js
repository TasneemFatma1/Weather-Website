const bcrypt = require("bcrypt");
const { User } = require("../config/database");


exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password and store it
        const hashedPassword = await bcrypt.hash(password, 5);
        await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Sign-up error:", error);
        res.status(500).json({ error: "Database error" });
    }
};

exports.login = async (req, res) => {
    try {
        if (req.session.user) {
            return res.status(302).json({ message: "Already logged in" });
        }

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: "Invalid username" });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // console.log(user.id)
        req.session.user = { id: user.id, username: user.username };
        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
};
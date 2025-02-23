const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/data', (req, res) => {
    const filePath = path.join(__dirname, '../data.json'); // Adjust the path if needed

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

module.exports = router;

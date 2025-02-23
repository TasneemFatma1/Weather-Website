const express = require("express");
const { insertTemperature, getTemperature, updateTemperature, deleteTemperature, insertHumidity, getHumidity, updateHumidity, deleteHumidity } = require("../controllers/weatherController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/insert", authMiddleware, insertTemperature);
router.get("/getdata", authMiddleware, getTemperature);
router.put("/update", authMiddleware, updateTemperature);
router.delete("/delete", authMiddleware, deleteTemperature);

router.post("/inserth", authMiddleware, insertHumidity);
router.get("/getdatah", authMiddleware, getHumidity);
router.put("/updateh", authMiddleware, updateHumidity);
router.delete("/deleteh", authMiddleware, deleteHumidity);

module.exports = router;

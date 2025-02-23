// controllers/weatherController.js
const Temperature = require("../models/temperature");
const Humidity = require("../models/humidity");


//CRUD operations for temperature model
exports.insertTemperature = async (req, res) => {
    try {
        // Your logic to insert temperature data
        const {id, city, celsius, fahrenheit}= req.body;
        if(!city || !celsius || !fahrenheit){
            return res.status(400).json({ error: "City and Temp are required!" });
        }

        const temperature=await Temperature.create({id,city,celsius,fahrenheit});

        res.status(201).json({ message: "Temperature inserted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to insert temperature", details: error.message });
    }
};

exports.getTemperature =async (req, res) => {
    try {
        const temperatures = await Temperature.findAll();
        res.status(200).json({ temperatures });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch temperature" });
    }
};

exports.updateTemperature = async( req, res) => {
    try{
        const { id, city, celsius, fahrenheit } = req.body;

        // Validate required fields
        if (!id || !city || !celsius || !fahrenheit) {
            return res.status(400).json({ error: "ID, City, and Temperature are required!" });
        }

        const temperature = Temperature.findByPk(id);
        if(!temperature){
            return res.status(404).json({ error: "Record not found" });
        }
        await Temperature.update(
            { city, celsius, fahrenheit },
            { where: { id } }
        );
        const updatedTemperature = await Temperature.findByPk(id);
        res.status(200).json({
            message: "Temperature updated successfully",
            updatedTemperature
        });
    }catch(error){
        console.error("Update Error:", error);
        res.status(500).json({ error: "Failed to update temperature", details: error.message });
    }
}

exports.deleteTemperature = async( req, res) => {
    try{
        const { id } = req.body; // Only ID is needed for deletion

        // Validate ID
        if (!id) {
            return res.status(400).json({ error: "ID is required!" });
        }

        // Find record by ID
        const temperature = await Temperature.findByPk(id);
        if(!temperature){
            return res.status(404).json({ error: "Record not found" });
        }
        await Temperature.destroy(
            { where: { id } }
        );
        res.status(200).json({
            message: "Temperature record deleted successfully",
            deletedRecord: id // Returning deleted record for reference
        });
    }catch(error){
        console.error("Update Error:", error);
        res.status(500).json({ error: "Failed to update temperature", details: error.message });
    }
}

//CRUD operations for humidity

exports.insertHumidity = async (req, res) => {
    try {
        // Your logic to insert temperature data
        const {id, city, windspeed, airquality, precipitation}= req.body;
        if(!city || !windspeed || !airquality || !precipitation){
            return res.status(400).json({ error: "City and other details are required!" });
        }

        const humidity=await Humidity.create({id,city,windspeed,airquality,precipitation});

        res.status(201).json({ message: "Humidity data inserted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to insert humidity data", details: error.message });
    }
};

exports.getHumidity =async (req, res) => {
    try {
        const humidity = await Humidity.findAll();
        res.status(200).json({ humidity });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch humidity data" });
    }
};

exports.updateHumidity = async( req, res) => {
    try{
        const { id, city, windspeed, airquality, precipitation } = req.body;

        // Validate required fields
        if (!id || !city || !windspeed || !airquality || !precipitation) {
            return res.status(400).json({ error: "ID, City, and other details are required!" });
        }

        const humidity = Humidity.findByPk(id);
        if(!humidity){
            return res.status(404).json({ error: "Record not found" });
        }
        await Humidity.update(
            { city, windspeed, airquality, precipitation },
            { where: { id } }
        );
        const updatedHumidity = await Humidity.findByPk(id);
        res.status(200).json({
            message: "Data updated successfully",
            updatedHumidity
        });
    }catch(error){
        console.error("Update Error:", error);
        res.status(500).json({ error: "Failed to update data", details: error.message });
    }
}

exports.deleteHumidity = async( req, res) => {
    try{
        const { id } = req.body; // Only ID is needed for deletion

        // Validate ID
        if (!id) {
            return res.status(400).json({ error: "ID is required!" });
        }

        // Find record by ID
        const humidity = await Humidity.findByPk(id);
        if(!humidity){
            return res.status(404).json({ error: "Record not found" });
        }
        await Humidity.destroy(
            { where: { id } }
        );
        res.status(200).json({
            message: "Humidity record deleted successfully",
            deletedRecord: id // Returning deleted record for reference
        });
    }catch(error){
        console.error("Update Error:", error);
        res.status(500).json({ error: "Failed to update humidity", details: error.message });
    }
}
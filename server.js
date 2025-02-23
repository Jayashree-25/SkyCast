import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

// Check if API key is loaded
if (!process.env.API_KEY) {
    console.error("API Key is missing!");
    process.exit(1); // Stop server if API key is not found
}

app.get("/weather", async (req, res) => {
    console.log("Received request for weather data...");
    
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    const apiKey = process.env.API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        console.log(`Fetching weather data for: ${city}`);
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

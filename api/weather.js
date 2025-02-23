import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: "City parameter is required" });
    }

    const apiKey = process.env.API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            return res.status(400).json({ error: data.error.message });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

export default app;

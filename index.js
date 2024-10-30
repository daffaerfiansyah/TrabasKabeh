import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static('public')); // Folder untuk file statis seperti HTML, CSS, dan JS

app.get('/api/weather', async (req, res) => {
    const { city, lat, lon } = req.query;
    const apiKey = process.env.WEATHER_API_KEY;
    let url;

    // Tentukan URL berdasarkan apakah city atau lat/lon yang diterima
    if (city) {
        url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;
    } else if (lat && lon) {
        url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`;
    } else {
        return res.status(400).json({ error: 'City name or latitude and longitude are required' });
    }

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

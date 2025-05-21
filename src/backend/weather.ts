import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/weather', async (req, res) => {
  const { lat, lon, appid } = req.query;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=12.56&lon=80.12&appid=${appid}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/forecast', async (req, res) => {
  const { lat, lon, appid } = req.query;
  const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=12.34&lon=80.99&appid=${appid}`

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
})

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
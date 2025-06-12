import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

const API_key = `ece46092f17257a807d9275278ce44a9`

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=12.56&lon=80.12&appid=${API_key}&units=metric`;

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
  const { lat, lon } = req.query;
  const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=12.34&lon=80.99&appid=${API_key}`

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
})

app.get('/pollution', async (req, res) => {
  const { lat, lon } = req.query;
  const apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=12.56&lon=80.12&appid=${API_key}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching air pollution data:', error);
    res.status(500).json({ error: 'Failed to fetch air pollution data' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
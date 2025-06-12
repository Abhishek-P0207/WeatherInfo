import { useState, FormEvent } from "react";
import "../styles/DailyWeather.css";

function DailyWeather() {
    const [weatherInfo, setWeatherInfo] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const lat = formJson.latitude;
        const lon = formJson.longitude;

        try {
            const response = await fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`, {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                },
            })
            const data = await response.json();
            const specific = {location : data.name, weather : data.main, desc : data.weather}
            setWeatherInfo(JSON.stringify(specific, null, 2));
            console.log(data)
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="parent-box">
            <div className="form-box">
                <form method='post' onSubmit={handleSubmit}>
                    <label>Enter the coordinates(Lat)</label>
                    <input type="text" name='latitude' defaultValue={26.55} />

                    <label>Enter the coordinates(Lon)</label>
                    <input type="text" name='longitude' defaultValue={74.12} />
                    <br />

                    <textarea className="weather-info-box" name="info" value={weatherInfo}></textarea>
                    {/* <div className="weather-info-box">
                        
                    </div> */}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default DailyWeather;
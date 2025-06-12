import { useState, useEffect } from 'react';
import { RxArrowTopRight } from 'react-icons/rx';
import { FiWind } from "react-icons/fi";
import Slider from 'react-slick';
import allLogo from "../../assets/*.svg"
import bgImage from "../../assets/bg2.jpg"

const allLogos = import.meta.glob("../../assets/weather-icons-master/weather-icons-master/production/fill/all/*.svg", { eager: true })


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function WeatherCards() {
    const [weatherData, setWeatherData] = useState<{
        location: string;
        main: any;
        weather: any[];
        wind: any;
        aqi: string;
    } | null>(null);

    const lat = 28.6139;
    const lon = 77.2090;

    useEffect(() => {
        async function fetchData() {
            try {
                await getWeatherData();
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }
        fetchData();
    }, []);

    async function getWeatherData() {
        try {
            const response = await fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const pollution = await fetch(`http://localhost:3000/pollution?lat=${lat}&lon=${lon}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            const data2 = await pollution.json();
            const specific = {
                location: data.name,
                main: data.main,
                weather: data.weather,
                wind: data.wind,
                aqi: data2.list[0].main.aqi,
            };
            console.log(specific);
            setWeatherData(specific);
        } catch (err) {
            console.error(err);
        }
    }

    const settings = {
        dots: true,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        scroll:true,
        swipe: true,
        swipeToSlide: true,
        draggable: true,
        touchThreshold: 10,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="bg-no-repeat bg-cover bg-center" style={{backgroundImage: `url(${bgImage})`}}>
            <header className="sticky top-0 pt-5 pl-3 w-full h-16 text-center">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl md:text-4xl font-bold pl-5 text-white">WeatherInfo</h1>
                </div>
            </header>

            <div className="flex justify-center items-center  h-[calc(100vh-4rem)] overflow-hidden">
                {weatherData && (
                    <div className="w-[90%] max-w-[1200px]">
                        <Slider {...settings}>
                            <WeatherCard
                                title="Temperature"
                                icon={'overcast-day'}
                                value={`${weatherData.main.temp}°C`}
                                temp_var={`Max:${weatherData.main.temp_max}°C  |  Min:${weatherData.main.temp_min}°C`}
                                subtitle={weatherData.weather[0]?.description}
                                location={weatherData.location}
                            />
                            <WeatherCard
                                title="Humidity"
                                icon={'humidity'}
                                value={`${weatherData.main.humidity}%`}
                                subtitle="Relative Humidity"
                            />
                            <WeatherCard
                                title="Wind Speed"
                                icon={'windsock'}
                                value={`${weatherData.wind.speed} m/s`}
                                subtitle="Wind Blowing Speed"
                            />
                            <WeatherCard
                                title="Air Pollution"
                                icon={'smoke-particles'}
                                value={`${weatherData.aqi}`}
                                subtitle="Air pollution"
                            />
                            <WeatherCard
                                title="Pressure"
                                icon={'barometer'}
                                value={`${weatherData.main.pressure} hPa`}
                                subtitle="Atmospheric Pressure"
                            />
                        </Slider>
                    </div>
                )}
            </div>
        </div>
    );
}

function WeatherCard({
    title,
    icon,
    value,
    subtitle,
    location,
    temp_var,
}: {
    title: string;
    icon?: string;
    value: string;
    subtitle?: string | null;
    location?: string | null;
    temp_var?: string | null;
}) {
    return (
        <div className="group relative shadow-lg text-black rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer mx-2 transition-transform hover:scale-95">
            <div className="absolute inset-0 opacity-90 bg-gradient-to-br from-[#7393B3] to-[#00000040] group-hover:opacity-100 transition-all duration-300 rounded-xl" />
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm uppercase text-gray-900">{title}</h2>
                        {icon && (
                            <div className="relative w-1/3 pb-[33%]">
                                <img
                                    src={allLogos[`../../assets/weather-icons-master/weather-icons-master/production/fill/all/${icon}.svg`]?.default}
                                    alt="weather icon"
                                    className="absolute inset-0 w-full h-full object-contain"
                                />
                            </div>
                        )}
                    </div>
                    <h1 className="text-2xl lg:text-4xl font-bold">{value}</h1>
                    <p className="text-sm lg:text-base text-gray-900">{temp_var}</p>
                    <p className="text-sm lg:text-base text-gray-700">{subtitle}</p>
                </div>
                <div className="text-sm text-gray-500 mt-4 flex items-center justify-between">
                    <span>{location}</span>
                    <RxArrowTopRight className="w-[25px] h-[25px] text-gray-600 group-hover:text-blue-500 group-hover:rotate-45 transition-transform duration-200" />
                </div>
            </div>
        </div>
    );
}
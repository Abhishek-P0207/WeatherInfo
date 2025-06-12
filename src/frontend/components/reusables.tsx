<SwiperSlide key={weatherData.location}>
    <div className="flex flex-col gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
        <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
        <div className="relative flex flex-col gap-3">
            <h1 className="text-xl lg:text-2xl">
                {weatherData.weather.temp}°C
            </h1>
            <p className="lg:text-[18px]">
                {weatherData.desc[0]?.description}
            </p>
        </div>
        <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
    </div>
</SwiperSlide>





import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { RxArrowTopRight } from "react-icons/rx";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

export default function WeatherCards() {
    const [weatherData, setWeatherData] = useState<{
        location: string;
        main: any;
        weather: any[];
        wind: any[];
    } | null>(null);

    // Define coordinates (replace with dynamic values if needed)
    const lat = 28.6139; // Example: New Delhi
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
            const data = await response.json();
            const specific = {
                location: data.name,
                main: data.main,
                weather: data.weather,
                wind: data.wind,
            };
            console.log(data);
            setWeatherData(specific);
        } catch (err) {
            console.error(err);
        }
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="flex items-center justify-center flex-col h-[900px] bg-[#6c34af]">
            
                {weatherData && (
                    <>
                        <Slider {...settings}>
                            <WeatherCard
                                title={`Temperature`}
                                icon={`${weatherData.weather[0].icon}`}
                                location={`${weatherData.location}`}
                                value={`${weatherData.main.temp}°C`}
                                subtitle={weatherData.weather[0]?.description}
                            />
                        
                            <WeatherCard
                                title={`Wind speed`}
                                icon={`${weatherData.weather[0].icon}`}
                                value={`${weatherData.wind.speed}`}
                            />
                        </Slider>
                    </>
                )}
        </div>
    );
}


function WeatherCard({
    title,
    icon,
    value,
    subtitle,
    location
}: {
    title: string;
    icon: string;
    value: string;
    subtitle?: string | null;
    location?: string | null;
}) {
    return (
        <div className="flex gap-6 mb-20 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
            <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
            <div className="relative flex flex-col gap-3">
                <h2 className="text-lg opacity-75">{title}</h2>
                <h2 className="text-lg opacity-75">{icon}</h2>
                <span className="text-sm mt-2 opacity-80">{location}</span>
                <h1 className="text-xl lg:text-3xl font-semibold">{value}</h1>
                <p className="lg:text-[18px]">{subtitle}</p>
            </div>
            <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
        </div>
    );
}

// v3

import { useState, useEffect } from 'react';
import { RxArrowTopRight } from 'react-icons/rx';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function WeatherCards() {
    const [weatherData, setWeatherData] = useState<{
        location: string;
        main: any;
        weather: any[];
        wind: any;
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
            const data = await response.json();
            const specific = {
                location: data.name,
                main: data.main,
                weather: data.weather,
                wind: data.wind,
            };
            console.log(data);
            setWeatherData(specific);
        } catch (err) {
            console.error(err);
        }
    }

    const settings = {
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
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
        <div className="flex justify-center items-center bg-[#6c34af] py-10 min-h-screen">
            {weatherData && (
                <div className="w-[90%] max-w-[1200px]">
                    <Slider {...settings}>
                        <WeatherCard
                            title="Temperature"
                            icon={weatherData.weather[0]?.icon}
                            value={`${weatherData.main.temp}°C`}
                            temp_var={`Max:${weatherData.main.temp_max}°C  |  Min:${weatherData.main.temp_min}°C`}
                            subtitle={weatherData.weather[0]?.description}
                            location={weatherData.location}
                        />
                        <WeatherCard
                            title="Humidity"
                            icon={weatherData.weather[0]?.icon}
                            value={`${weatherData.main.humidity}%`}
                            subtitle="Relative Humidity"
                        />
                        <WeatherCard
                            title="Wind Speed"
                            icon={weatherData.weather[0]?.icon}
                            value={`${weatherData.wind.speed} m/s`}
                            subtitle="Wind Blowing Speed"
                        />
                        <WeatherCard
                            title="Pressure"
                            icon={weatherData.weather[0]?.icon}
                            value={`${weatherData.main.pressure} hPa`}
                            subtitle="Atmospheric Pressure"
                        />
                    </Slider>
                </div>
            )}
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
    icon: string;
    value: string;
    subtitle?: string | null;
    location?: string | null;
    temp_var?: string | null;
}) {
    return (
        <div className="group relative shadow-lg bg-white text-black rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer mx-2 transition-transform hover:scale-95">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00000020] to-[#00000040] group-hover:opacity-60 transition-all duration-300 rounded-xl" />
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex flex-col gap-3">
                    <h2 className="text-sm uppercase text-gray-600">{title}</h2>
                    {icon && (
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt="weather icon"
                            className="w-[50px] h-[50px]"
                        />
                    )}
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





// v4

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

export default function WeatherCards() {
    const [weatherData, setWeatherData] = useState<any[]>([]);
    const [cardIndex, setCardIndex] = useState(0);

    const lat = 28.6139;
    const lon = 77.2090;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`);
                const data = await response.json();

                const cards = [
                    {
                        title: 'Temperature',
                        value: `${data.main.temp}°C`,
                        subtitle: data.weather[0]?.description,
                        icon: data.weather[0]?.icon,
                    },
                    {
                        title: 'Humidity',
                        value: `${data.main.humidity}%`,
                        subtitle: 'Relative humidity',
                        icon: data.weather[0]?.icon,
                    },
                    {
                        title: 'Wind Speed',
                        value: `${data.wind.speed} m/s`,
                        subtitle: 'Wind blowing speed',
                        icon: data.weather[0]?.icon,
                    },
                ];
                setWeatherData(cards);
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, []);

    const handleSwipe = (offsetX: number) => {
        if (offsetX < -100 && cardIndex < weatherData.length - 1) {
            setCardIndex(cardIndex + 1);
        } else if (offsetX > 100 && cardIndex > 0) {
            setCardIndex(cardIndex - 1);
        }
    };

    const goLeft = () => {
        if (cardIndex > 0) setCardIndex(cardIndex - 1);
    };

    const goRight = () => {
        if (cardIndex < weatherData.length - 1) setCardIndex(cardIndex + 1);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[#6c34af] text-white relative overflow-hidden">
            {/* Arrows */}
            <button
                onClick={goLeft}
                className="absolute left-4 z-50 text-white p-2 bg-black bg-opacity-30 rounded-full hover:bg-opacity-70"
                disabled={cardIndex === 0}
            >
                <RxArrowLeft size={32} />
            </button>
            <button
                onClick={goRight}
                className="absolute right-4 z-50 text-white p-2 bg-black bg-opacity-30 rounded-full hover:bg-opacity-70"
                disabled={cardIndex === weatherData.length - 1}
            >
                <RxArrowRight size={32} />
            </button>

            <div className="relative w-[95%] max-w-md h-[460px]">
                {weatherData.map((card, i) => {
                    const isActive = i === cardIndex;
                    const isVisible = Math.abs(i - cardIndex) <= 1;

                    return (
                        <AnimatePresence key={i}>
                            {isVisible && (
                                <motion.div
                                    key={i}
                                    drag={isActive ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(e, info) => isActive && handleSwipe(info.offset.x)}
                                    initial={{ x: (i - cardIndex) * 200, scale: 0.9, opacity: 0 }}
                                    animate={{
                                        x: (i - cardIndex) * 50,
                                        scale: isActive ? 1 : 0.9,
                                        opacity: 1,
                                        zIndex: 10 - Math.abs(i - cardIndex),
                                    }}
                                    exit={{ x: (i < cardIndex ? -200 : 200), opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-full p-6 rounded-xl shadow-2xl bg-white text-black flex flex-col justify-center items-center gap-4 ${
                                        isActive ? "cursor-grab" : "pointer-events-none"
                                    }`}
                                >
                                    <h2 className="text-lg text-gray-500">{card.title}</h2>
                                    {card.icon && (
                                        <img
                                            src={`https://openweathermap.org/img/wn/${card.icon}@2x.png`}
                                            alt="icon"
                                            className="w-20 h-20"
                                        />
                                    )}
                                    <h1 className="text-3xl font-bold">{card.value}</h1>
                                    <p className="text-base text-gray-600">{card.subtitle}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    );
                })}
            </div>
        </div>
    );
}

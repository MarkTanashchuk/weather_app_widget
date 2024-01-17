import { getName } from 'country-list';

const API_KEY = import.meta.env['VITE_OPEN_WEATHER_API_KEY'] || '';
const BASE_URL = import.meta.env['VITE_OPEN_WEATHER_API_BASE_URL'] || '';

interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  icon: string;
  main: string;
  description: string;
}

export interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Wind {
  deg: number;
  speed: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  id: number;
  type: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  id: number;
  sys: Sys;
  weather: Weather[];
  name: string;
  country: string;
  iconURL: string;
  coord: Coord;
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  cod: number;
}

export async function getWeather(city: string): Promise<WeatherData> {
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;

  let result: WeatherData;

  if (city === '') {
    throw Error('Please provide the name of a city');
  }

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      throw Error(`'${city}' could not be found`);
    }

    if (!response.ok) {
      throw Error('Failed to make a request');
    }

    result = await response.json();
  } catch (err) {
    console.warn(err);

    throw Error('Internal server error');
  }

  return {
    ...result,
    country: getName(result.sys.country) || 'Unknown',
    iconURL: `https://openweathermap.org/img/wn/${result.weather[0]?.icon}@1x.png`
  };
}

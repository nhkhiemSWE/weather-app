import sampleWeather from "@/api/current-weather.json";
import dailyForecast from "@/api/daily-forecast.json";
import hourlyForecast from "@/api/hourly-forecast.json";
import { title } from "process";

export const units = {
  temperature: '°C',
  precipitation: 'mm/h',
  windSpeed: 'm/s',}

// ── types you’ll actually use in the UI ──────────────────────────────
export interface WeatherData {
  cloud_cover:  number;
  feels_like:   number;
  humidity:     number;
  icon_num:     number;
  precipitation:number;   // mm in the last hour (or 0)
  summary:      string;
  temperature:  number;   // Kelvin unless you ask ºC/ºF in the API call
  uv_index:     number;
  visibility:   number;   // metres
  wind_speed:   number;   // m s-1
}

/* ───────────── widget model ───────────── */

export class WeatherWidget {
  constructor(
    public id:    number,
    public icon:  string,
    public name:  string,
    public value: number,
    public unit:  string
  ) {}
};

export type ForecastData = 
  | {
      type : 'hourly';
      title: string;
      data: HourlyData[];
    }
  | {
      type :'daily';
      title: string;
      data: DailyForecastData[];
};


export type DailyForecastData =
{
  type : 'daily';
  title: string;
  data: DailyData[];
};

export type HourlyForecastData =
{
  type : 'hourly';
  title: string;
  data: HourlyData[];
};


export interface HourlyData {
  date: string;
  icon: number;
  summary: string;
  temperature: number;
  precipitation: {
    total: number;
  };
  wind: {
    speed: number;
    angle: number;
  };
}

export interface DailyData {
  date: string;
  icon: number;
  summary: string;
  temperature_max: number;
  temperature_min: number;
  precipitation: {
    total: number;
  };
}

/**
 * Flatten OpenWeather “current” block into the UI-ready WeatherData object.
 */
export function getCurrentWeather(): WeatherData {
  const current  = sampleWeather.current;
  return {
    cloud_cover:  current.cloud_cover,
    feels_like:   current.feels_like,
    humidity:     current.humidity,
    icon_num:     current.icon_num,
    precipitation: current.precipitation.total,
    summary:      current.summary,
    temperature:  current.temperature,
    uv_index:     current.uv_index,
    visibility:   current.visibility,
    wind_speed:   current.wind.speed,
  };
}

/* ───────────── builder ───────────── */

export function buildOtherInfoWidgets(data: WeatherData): WeatherWidget[] {
  return [
    new WeatherWidget(
      0,
      'droplet',
      'Precipitation',
      Math.round(data.precipitation),
      'mm/h'
    ),
    new WeatherWidget(
      1,
      'wind',
      'Wind Speed',
      Math.round(data.wind_speed),
      'm/s'
    ),
    new WeatherWidget(
      2,
      'moisture',
      'Humidity',
      Math.round(data.humidity),
      '%'
    ),
    new WeatherWidget(
      3,
      'sunglasses',
      'UV Index',
      Math.round(data.uv_index),
      ''
    ),
    new WeatherWidget(
      4,
      'clouds-fill',
      'Cloud Cover',
      Math.round(data.cloud_cover),
      '%'
    ),
    new WeatherWidget(
      5,
      'eye',
      'Visibility',
      Math.round(data.visibility / 1000), // convert m → km
      'km'
    ),
  ];
}

/* -------- Time format -------- */

/* -------- daily -------- */
export function getDailyForecast(): DailyForecastData {
  const daily: DailyData[] = dailyForecast.daily.data.map(d => ({
    date: d.day,
    icon: d.icon,
    summary: d.summary,
    temperature_max: d.temperature_max,
    temperature_min: d.temperature_min,
    precipitation: { total: d.precipitation.total },
  }));

  return {
    type: 'daily',
    title: '21 DAYS FORECAST',
    data: daily,
  };
}

/* -------- hourly -------- */
export function getHourlyForecast(): HourlyForecastData {
  const hourly: HourlyData[] = hourlyForecast.hourly.data.map(d => ({
    date: d.date,
    icon: d.icon,
    summary: d.summary,
    temperature: d.temperature,
    precipitation: { total: d.precipitation.total },
    wind: { speed: d.wind.speed, angle: d.wind.angle },
  }));

  return {
    type: 'hourly',
    title: 'HOURLY FORECAST',
    data: hourly,
  };
}
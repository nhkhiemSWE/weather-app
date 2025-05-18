import sampleWeather from "@/api/current-weather.json";

// ── types you’ll actually use in the UI ──────────────────────────────
export interface WeatherData {
  cloud_cover:  number;
  feels_like:   number;
  humidity:     number;
  icon_num:     string;
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
}

// ── minimal slice of the OpenWeather response we care about ─────────
interface OpenWeatherResponse {
  current: {
    clouds:       number;
    feels_like:   number;
    humidity:     number;
    temp:         number;
    uvi:          number;
    visibility:   number;
    wind_speed:   number;
    weather:      { description: string; icon: string }[];

    // present only when it’s raining/snowing
    rain?: { ['1h']?: number };   // mm in the last hour
    snow?: { ['1h']?: number };
  };
}

/**
 * Flatten OpenWeather “current” block into the UI-ready WeatherData object.
 */
export function getCurrentWeather(data: OpenWeatherResponse = sampleWeather): WeatherData {
  const { current } = data;

  const precipitation =
    // prefer rain, then snow; if neither key exists → 0
    current.rain?.['1h'] ??
    current.snow?.['1h'] ??
    0;

  return {
    cloud_cover:  current.clouds,
    feels_like:   current.feels_like,
    humidity:     current.humidity,
    icon_num:     current.weather?.[0]?.icon ?? '',
    precipitation,
    summary:      current.weather?.[0]?.description ?? '',
    temperature:  current.temp,
    uv_index:     current.uvi,
    visibility:   current.visibility,
    wind_speed:   current.wind_speed
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

/* ───────────── usage ───────────── */

// const data: WeatherData = getCurrentWeather(apiJson);
// const widgets = buildOtherInfoWidgets(data);

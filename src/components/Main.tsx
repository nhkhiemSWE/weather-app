import "@/styles/components/Main.scss"
import CurrentWeather from "./CurrentWeather"
import { getDailyForecast, getHourlyForecast } from "@/api"
import HourlyForecast from "./HourlyForecast"
import DailyForecast from "./DailyForecast"

const Main = () => {
  return (
    <div className="Main">
      <CurrentWeather/>
      <HourlyForecast {...getHourlyForecast()} />
      <DailyForecast {...getDailyForecast()} />
    </div>
  )
}

export default Main
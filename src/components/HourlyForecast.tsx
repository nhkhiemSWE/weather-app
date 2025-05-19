import HourlyForecastWidget from "@/components/HourlyForecastWidget"
import "@/styles/components/Forecast.scss"
import { HourlyForecastData } from "@/api/index"

const HourlyForecast = ({title, data}: HourlyForecastData) => { 
  return (
    <div className="Forecast">
      <div className="forecast-container">
        <h3>{title}</h3>
        <div className="widget-container">
          {
            data.map((singleData) => (
              <div> 
                <HourlyForecastWidget data={singleData} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default HourlyForecast
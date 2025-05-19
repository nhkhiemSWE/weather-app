import DailyForecastWidget from "@/components/DailyForecastWidget"
import "@/styles/components/Forecast.scss"
import { DailyForecastData } from "@/api/index"

const DailyForecast = ({title, data}: DailyForecastData) => { 
  return (
    <div className="Forecast">
      <div className="forecast-container">
        <h3>{title}</h3>
        <div className="widget-container">
          {
            data.map((singleData) => (
              <div> 
                <DailyForecastWidget data={singleData} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DailyForecast
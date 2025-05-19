import HourlyForecastWidget from "@/components/HourlyForecastWidget"
import DailyForecastWidget from "@/components/DailyForecastWidget"
import "@/styles/components/Forecast.scss"
import { DailyData, ForecastData, HourlyData} from "@/api"

const Forecast = ({type, title, data}: ForecastData) => { 
  return (
    <div className="Forecast">
      <div className="forecast-container">
        <h3>{title}</h3>
        <div className="widget-container">
          {
            data.map((singleData) => (
              <div> 
                {
                  type === "hourly" ? (
                    <HourlyForecastWidget data={singleData as HourlyData}/> 
                  ) : (
                    {
                      "date" in singleData &&
                      "icon" in singleData &&
                      "summary" in singleData &&
                      "temperature_max" in singleData &&
                      "temperature_min" in singleData ? (
                        <DailyForecastWidget data={singleData as DailyData} />
                      ) : null
                    }
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Forecast
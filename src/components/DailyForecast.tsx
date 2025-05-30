import DailyForecastWidget from "@/components/DailyForecastWidget"
import "@/styles/components/Forecast.scss"
import { DailyForecastData } from "@/api/index"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const DailyForecast = ({title, data}: DailyForecastData) => { 
  return (
    <div className="Forecast">
      {/* <div className="forecast-container"> */}
        <h3>{title}</h3>
        <ScrollArea type="hover" className="w-full">
          <div className="widget-container flex w-max gap-3 px-1 py-2 whitespace-nowrap">
            {data.map(singleData => (
              <DailyForecastWidget key={singleData.date} data={singleData} />
            ))}
          </div>
          <ScrollBar
            orientation="horizontal"
          />
        </ScrollArea>
        {/* <div className="widget-container">
          {
            data.map((singleData) => (
                <DailyForecastWidget key={singleData.date} data={singleData} />
            ))
          }
        </div> */}
    </div>
  )
}

export default DailyForecast
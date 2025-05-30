import HourlyForecastWidget from "@/components/HourlyForecastWidget"
import "@/styles/components/Forecast.scss"
import { HourlyForecastData } from "@/api/index"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


const HourlyForecast = ({title, data}: HourlyForecastData) => { 
  return (
    <div className="Forecast">
      <h3>{title}</h3>
        {/* <HorizontallyScrollable className="widget-container">
          {
            data.map((singleData) => (
                <HourlyForecastWidget key={singleData.date} data={singleData} />
            ))
          }
        </HorizontallyScrollable> */}
      <ScrollArea className="w-full">
        <div className="widget-container flex gap-3 px-1 py-2 whitespace-nowrap">
          {data.map(singleData => (
              <HourlyForecastWidget key={singleData.date} data={singleData} />
          ))}
        </div>
        <ScrollBar
          orientation="horizontal"
        />
      </ScrollArea>
    </div>
  )
}

export default HourlyForecast

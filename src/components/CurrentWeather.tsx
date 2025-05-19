import { getCurrentWeather, WeatherData, WeatherWidget, buildOtherInfoWidgets } from "@/api"
import '@/styles/components/CurrentWeather.scss'
import WeatherIcon from "./WeatherIcon";

const CurrentWeather = () => {
  const data : WeatherData = getCurrentWeather();
  const otherInfoWidgets : WeatherWidget[] = buildOtherInfoWidgets(data);
  return (
    <div className="CurrentWeather">
      <div className="temperature">
        <WeatherIcon iconNumber={data.icon_num} summary={data.summary}/>
        <div className="value">
          <div className="real">{data.temperature} °C </div>
          <div className="feels_like">fells like {data.feels_like} °C</div>
        </div>
        <div className="summary">{data.summary}</div>
      </div>
      
      <div className="other-infos">
        {otherInfoWidgets.map(({id, icon, name, value, unit}: WeatherWidget) => (
          <div className="widget" key = {id}>
            <div className="widget-container">
              <div className="info">
                <div className="icon">
                  <i className={`bi bi-${icon}`}></i>
                </div>
                <div className="value">
                  {value} {unit}
                </div>
              </div>
              <div className="name">
                {name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CurrentWeather
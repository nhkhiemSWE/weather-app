import WeatherIcon from '@/components/WeatherIcon';
import {HourlyData, units} from '@/api/index';

interface HourlyForecastWidgetProps {
  data: HourlyData;
}

const HourlyForecastWidget = ({data} : HourlyForecastWidgetProps) => {
  const {date, icon, summary, temperature, precipitation, wind} = data;
  // console.log("HourlyForecastWidget", date);

  const nowDate = {
    day: new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    }).format(new Date()),
    time: new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date().setMinutes(0)),
  }

  const weatherDate = {
    day: new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    }).format(new Date(date)),
    time: new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date).setMinutes(0)),
  }

  const isNow = nowDate.day === weatherDate.day && nowDate.time === weatherDate.time;
  if (isNow) {
    weatherDate.day = "Today";
  } else if (weatherDate.time !== "12:00 AM") {
    weatherDate.day = '' ;
  }

  return (
    <div className='widget'>
      <div className="day"> {weatherDate.day}</div>
      <div className="time"> {weatherDate.time}</div>
      <div className="icon-temp">
        <div className="icon">
          <WeatherIcon iconNumber={icon} summary={summary}/>
        </div>
        <div className="temperature"> {Math.round(temperature)} {units.temperature} </div>
        <div className="precipitation"> {Math.round(precipitation.total)} {units.precipitation} </div>
        <div className="wind">
          <div className="speed"> {Math.round(wind.speed)} {units.windSpeed}</div>
          <div className="dir" style={{transform: `rotate(${-45 + wind.angle}deg)`}}>
            <i className="bi bi-arrow-up"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HourlyForecastWidget;
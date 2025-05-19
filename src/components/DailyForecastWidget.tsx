import WeatherIcon from '@/components/WeatherIcon';
import {DailyData, units} from '@/api/index';

interface DailyForecastWidgetProps {
  data: DailyData;
}

const DailyForecastWidget = ({data} : DailyForecastWidgetProps) => {
  const {
    date, icon, summary, temperature_max, temperature_min, precipitation,
  } = data;

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

  const isNow = nowDate.day === weatherDate.day;
  if (isNow) {
    weatherDate.day = "Today";
  }
  return (
    <div className='widget'>
      <div className="day"> {weatherDate.day}</div>
      <div className="icon-temp">
        <div className="icon">
          <WeatherIcon iconNumber={icon} summary={summary}/>
        </div>
        <div className="temperature">
          <div className="max">{Math.round(temperature_max)} {units.temperature}</div>
          <div className="min">{Math.round(temperature_min)} {units.temperature}</div>
        </div>
        <div className="precipitation"> {Math.round(precipitation.total)} {units.precipitation} </div>
      </div>
    </div>
  )
}


export default DailyForecastWidget;
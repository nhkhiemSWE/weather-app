type IconProps = {
  iconNumber: number;
  summary: string;
}
const WeatherIcon = ({iconNumber, summary}: IconProps) => {
  return (
    <div className="weather-icon">
    <img
      src={`icons/${iconNumber}.png`}
      alt={summary}
    />
  </div>
  )
}

export default WeatherIcon
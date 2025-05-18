import React from 'react'
import './Weather.css'

const Weather = () => {
  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search for a city..." />
        <button>Search</button>
        </div>
    </div>
  )
}

export default Weather
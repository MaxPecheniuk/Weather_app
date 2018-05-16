import * as React from 'react';
import { apiConfigs } from '../../configs/apiConfigs';
import { CurrentWeatherTypes } from '../../types/currentWeather.types';

interface CityItemProps {
  weatherData: CurrentWeatherTypes;
  weatherIcon: string;
  weatherDescription: string;

}

export const CurrentWeatherCityItem: React.SFC<CityItemProps> = (props: CityItemProps) => {
  return (
    <div className="city-list-item">
      <div className="city-list-item__city-name">
        {props.weatherData.name}
      </div>
      <div className="city-list-item__weather-condition">
        <img src={apiConfigs.conditionIconUrl + props.weatherIcon + '.png'} alt=""/>
        {props.weatherDescription}
      </div>
      <div className="city-list-item__current-temp">
      {Math.round(props.weatherData.main.temp)}°C
      </div>
      <div className="city-list-item__humidity">
        Humidity:{props.weatherData.main.humidity}%
      </div>
      <div className="city-list-item__wind">
        Wind: {props.weatherData.wind.speed}km/h
      </div>
    </div>
  );
};